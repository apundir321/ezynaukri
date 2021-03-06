import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification.service';
import { AuthenticationService } from '../_services';
import { JobService } from '../_services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private jobService: JobService,private router:Router,
     private authenticationService: AuthenticationService) { }
  job: any;
  url:any;
  serverUrl :any;
  isRecruiter : boolean = false
  recomendedJobs : any;
  ngOnInit() {
    this.serverUrl = environment.apiUrl;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser['roles'][0]==="ROLE_RECRUITER")
    {
      this.isRecruiter = true;
    }
    let jobId = this.route.snapshot.queryParamMap.get("jobId");
    if (jobId) {
      this.getJobDetail(jobId);
    }

  }

  getJobDetail(jobId: any) {
    this.jobService.getJobDetail(jobId).subscribe(data => {
      // console.log(data);
      // debugger;
      let jobData = data['job'];
      let organization = jobData['organization'];
      if(organization)
      {
        this.url = environment.apiUrl+"getProfilePic"+"/"+organization['orgProfileImage'];
      }
      let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
      if(appliedJobs)
      {
        if(appliedJobs.includes(jobData.id))
        {
          jobData['applied'] = true;
        }
      }
      this.job=jobData;
      console.log(data)
      let postData = {};
      let categoryId = data['job']['category']['id'];
      if(categoryId)
      {
      postData['category'] = categoryId;
      } 
      let filteredData = [];
      this.jobService.getFilterByTags(JSON.stringify(postData)).subscribe((data) => {
        // debugger;
        let jobs = data['pagesJob']['content'];
        let recomendedJobsArray = [];
        console.log(this.recomendedJobs);
        Object.keys(jobs).forEach((key)=>{
          let element = jobs[key];
          if(element['id'] != jobData.id )
          {
            recomendedJobsArray.push(element);
          }
        })
        if (recomendedJobsArray.length > 3) {
          for (let index = 0; index <= 3; index++) {
            const element = recomendedJobsArray[index];
            filteredData.push(element);
          }
          this.recomendedJobs = filteredData;
        } else {
          this.recomendedJobs = recomendedJobsArray;
        }
        console.log(this.recomendedJobs);
      });
    }
      , error => {
        this.notifyService.showError("Error in loading the page please try again later", "EzyNaukari says!!");
        this.router.navigate(['/joblanding']);
      }
    )
  }

  applyJob(jobId: string) {
    // debugger;
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.jobService.applyJob(jobId, currentUser.id).subscribe((data) => {
        console.log("Job Applied Successfully");
        let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
        appliedJobs.push(jobId);
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
        this.notifyService.showSuccess("Job Applied", "EzyNaukri")
        this.ngOnInit();
      })
    }
  }


}
