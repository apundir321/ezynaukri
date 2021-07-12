import { Component, OnInit } from '@angular/core';
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

  constructor(private jobService: JobService, private authenticationService: AuthenticationService,
    private notifyService : NotificationService) { }

  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
    this.jobService.getAppliedJobs(currentUser.id).subscribe((data) => {
      console.log("saved jobs data");
      console.log(data);
      this.savedJobs = data;
    })
  }
  }

}
