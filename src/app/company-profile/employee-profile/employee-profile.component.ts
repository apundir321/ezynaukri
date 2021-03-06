import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { Tag } from 'src/app/skills/skills.component';
import { AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  user:any;
  educations:any;
  workExperiences:any;
  loading = false;
  submitted = false;
  skills: string[]=[];
  userProfile:any;
  tags: Tag[] = [
   
  ];

  url:any;
  resumeUrl : any;

  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private userService: UserService,private jobService: JobService,private router:Router,
     private authenticationService: AuthenticationService) { }

  ngOnInit() {
    let employeeId = this.route.snapshot.queryParamMap.get("employeeId");
    // debugger;
    this.userService.getProfileById(employeeId).subscribe((data)=>{
      console.log(data);
      this.user = data;
      if(data){
      let userProfile = data;
      this.userProfile = userProfile;
      if(userProfile['resume']){
      this.resumeUrl = environment.apiUrl+'getProfilePicByProfileId/'+userProfile['resume']+'/'+userProfile['id'];
      }
        Object.keys(userProfile['tags']).forEach((key)=>{
         
          let skillName = userProfile['tags'][key];
          console.log(skillName);
          this.tags.push({"name":skillName['name']});
        })
      if(userProfile['educations'].length>0)
      {
        this.educations=userProfile['educations'];
      }
      if(userProfile['workExperiences'].length>0){
        this.workExperiences= userProfile['workExperiences'];
      }
    }
    },(error)=>{
      this.notifyService.showError("Error occured while loading user profile with message="+error,"Ezynaukari says!!");
      this.router.navigate(['/profileLanding']);
    })

  }

}
