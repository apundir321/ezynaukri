import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { ModalService } from '../_modal';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { JobService } from '../_services/job.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  workExperienceForm:FormGroup;
  user:any;
  educations:any;
  workExperiences:any;
  loading = false;
  submitted = false;

  
  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private jobService: JobService,private router:Router,private userService: UserService,
     private authenticationService: AuthenticationService,private modalService:ModalService,
     private formBuilder: FormBuilder,
     private alertService:AlertService) { }

  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
    this.userService.getUser(currentUser.id).subscribe((data)=>{
      console.log(data);
      this.user = data;
      let userProfile = data['userProfile'];
      if(userProfile['educations'].length>0)
      {
        this.educations=userProfile['educations'];
      }
      if(userProfile['workExperiences'].length>0){
        this.workExperiences= userProfile['workExperiences'];
      }
    },(error)=>{
      this.notifyService.showError("Error occured while loading user profile with message="+error,"Ezynaukari says!!");
      this.router.navigate(['/joblanding']);
    })
  }

    this.workExperienceForm = this.formBuilder.group({
      jobDesignation: ['', Validators.required],
      companyName: ['', Validators.required],
      location:['',Validators.required],
            startDate:[''],
            endDate:[''],
            description:['']
    });

    // this.userService.getUserProfile(currentUser.id).subscribe((data)=>{
    //   console.log(data);
    //   this.userForm.patchValue(data);
    // })
  }


  open(id:string)
  {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    //window.location.reload()

}

onSubmit() {
  this.submitted = true;
  // reset alerts on submit
  this.alertService.clear();

  // stop here if form is invalid
  if (this.workExperienceForm.invalid) {
      return;
  }
  let currentUser = this.authenticationService.currentUserValue;
  debugger;
  this.loading = true;
  console.log(this.workExperienceForm.value);
  this.userService.addWorkExperience(this.workExperienceForm.value,currentUser.id)
      .pipe(first())
      .subscribe(
          data => {
              this.closeModal("custom-modal-1");
              this.notifyService.showSuccess('Work Experience added', 'Ezynaukari Says!!');
              this.loading = false;
              this.ngOnInit();
          },
          error => {
              this.notifyService.showError('Error in adding work experience', 'Ezynaukari Says!!');
              this.loading = false;
          });
}

get f() { return this.workExperienceForm.controls; }


}
