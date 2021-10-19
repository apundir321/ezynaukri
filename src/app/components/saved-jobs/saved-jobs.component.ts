import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { AuthenticationService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {

  savedJobs:any;

  config: any;
  totalPages:any;
  findJobsCount:number =0;

  constructor(private jobService: JobService, private authenticationService: AuthenticationService,
    private notifyService : NotificationService, private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      debugger;
    this.jobService.getSavedJobs(currentUser.id).subscribe((data) => {
      console.log("saved job data");
      console.log(data);
      this.savedJobs =  data['pagesJob']['content'];
      this.totalPages= new Array(data['pagesJob']['totalPages']);
      this.findJobsCount = data['pagesJob']['totalElements'];
      this.config = {
        currentPage: 1,
        itemsPerPage: 3,
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

  deleteSavedJob(savedJobId: string) {
    debugger;
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.jobService.deleteSavedJob(savedJobId).subscribe((data)=>{
        debugger;
        console.log("Saved Job Deleted Successfully");
        
        this.notifyService.showSuccess("Saved Job Deleted","EzyNaukri Says!!")
        this.ngOnInit();
      })
    }
  }

}
