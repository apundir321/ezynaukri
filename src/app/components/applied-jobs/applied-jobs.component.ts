import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { AuthenticationService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';

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


  constructor(private jobService: JobService, private authenticationService: AuthenticationService,
    private notifyService : NotificationService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
    this.jobService.getAppliedJobs(currentUser.id).subscribe((data) => {
      console.log("Applied Jobs data");
      debugger;
      console.log(data);
      this.savedJobs = data['pagesJob']['content'];
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

}
