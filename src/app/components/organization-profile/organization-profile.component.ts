import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {

  org:any;
  url:any;
  jobs:any;
  locationUrl : any = "gurgaon";
  recomendedOrgs: any[];
  serverUrl :any
  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private userService: UserService,private jobService: JobService,private router:Router,
     private authenticationService: AuthenticationService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.url = environment.apiUrl;
    this.serverUrl = environment.apiUrl;
    // this.locationUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed&amp;q=gurgaon");
    let orgId = this.route.snapshot.queryParamMap.get("orgId");
    if (orgId) {
      this.getOrgDetail(orgId);
    }

  }

  getOrgDetail(orgId: any) {
    this.userService.getOrgDetail(orgId).subscribe(data => {
      console.log(data);
      this.org = data;
      let postData = {};
      if(data)
      {
        postData['organization'] = orgId;
      }
      this.jobService.getJobsById(JSON.stringify(postData)).subscribe(jobsData => {
        console.log(jobsData);
        if(jobsData['jobs'] && jobsData['jobs'].length>0)
        {
          this.jobs = jobsData['jobs'];
        }
      });

      let postCatData = {};
      let categoryId = data['category']['id'];
      if(categoryId)
      {
      postData['category'] = categoryId;
      } 
      let filteredData = [];
      this.jobService.getOrgsByCriteria(JSON.stringify(postData)).subscribe((orgData) => {
        // debugger;
       
        let recomendedOrgsArray = [];
       
        Object.keys(orgData).forEach((key)=>{
          let element = orgData[key];
          // if(element['id'] != data['id'] )
          // {
            recomendedOrgsArray.push(element);
          // }
        })
        if (recomendedOrgsArray.length > 3) {
          for (let index = 0; index <= 3; index++) {
            const element = recomendedOrgsArray[index];
            filteredData.push(element);
          }
          this.recomendedOrgs = filteredData;
        } else {
          this.recomendedOrgs = recomendedOrgsArray;
        }
        console.log(this.recomendedOrgs);
    }
      , error => {
        this.notifyService.showError("Error in loading the page please try again later", "EzyNaukari says!!");
        this.router.navigate(['/joblanding']);
      }
    )
  })
}
}
