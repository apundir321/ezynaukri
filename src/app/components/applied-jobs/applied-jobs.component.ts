import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { AuthenticationService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {

  savedJobs:any;
  
  
  
  config: any;
  totalPages:any;
  findJobsCount:number =0;
  url : any;

  constructor(private jobService: JobService, private authenticationService: AuthenticationService,
    private notifyService : NotificationService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.url = environment.apiUrl;
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
    this.jobService.getAppliedJobs(currentUser.id).subscribe((data) => {
      console.log("Applied Jobs data");
      // debugger;
      console.log(data);
      this.savedJobs = data['pagesJob']['content'];
      this.totalPages= new Array(data['pagesJob']['totalPages']);
      this.findJobsCount = data['pagesJob']['totalElements'];
      this.config = {
        currentPage: 1,
        itemsPerPage: 6,
        totalItems: 0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage = params['page'] ? params['page'] : 1);
    })
  }
  }

  pageChange(newPage: number) {
    this.router.navigate(['applied-jobs'], { queryParams: { page: newPage } });
  }

  deleteAppliedJob(appliedJobId: string) {
    // debugger;
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.jobService.deleteAppliedJob(appliedJobId).subscribe((data)=>{
        // debugger;
        localStorage.removeItem("appliedJobs");
        console.log("Applied Job Deleted Successfully");
        
        this.notifyService.showSuccess("Applied Job Deleted","EzyNaukri Says!!")
        this.ngOnInit();
      })
    }
  }


}
