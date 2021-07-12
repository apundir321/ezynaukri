import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {

  user:any;
  url:any;
  jobs:any;

  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private userService: UserService,private jobService: JobService,private router:Router,
     private authenticationService: AuthenticationService) { }

  ngOnInit() {
    let recruiterId = this.route.snapshot.queryParamMap.get("recruiterId");
    if (recruiterId) {
      this.getRecruiterDetail(recruiterId);
    }

  }

  getRecruiterDetail(recruiterId: any) {
    this.userService.getRecruiter(recruiterId).subscribe(data => {
      console.log(data);
      this.user = data;
      let postData = {};
      if(data)
      {
        let profileId = data['id'];
        postData['posted_by'] = profileId;
      }
      this.jobService.getJobsById(JSON.stringify(postData)).subscribe(jobsData => {
        console.log(jobsData);
        if(jobsData['jobs'])
        {
          this.jobs = jobsData['jobs'];
        }
      });
    }
      , error => {
        this.notifyService.showError("Error in loading the page please try again later", "EzyNaukari says!!");
        this.router.navigate(['/joblanding']);
      }
    )
  }

}


