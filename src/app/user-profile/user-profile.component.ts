import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { Tag } from '../skills/skills.component';
import { ModalService } from '../_modal';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { JobService } from '../_services/job.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userForm:FormGroup;
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
      if(data['userProfile']){
      let userProfile = data['userProfile'];
      this.userProfile = userProfile;
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
      this.router.navigate(['/joblanding']);
    })

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email:['',Validators.required],
            currentJobRole:['',Validators.required],
            maxQualification:['',Validators.required],
            workExperience:[''],
            currentCtc:[''],
            expectedCtc:[''],
            aboutMe:['']
    });

    this.jobService.getUserProfile(currentUser.id).subscribe((data)=>{
      console.log(data);
      this.userForm.patchValue(data);
    })
    }

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
  }

  get f() { return this.userForm.controls; }

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
  alert("submitting");
  // reset alerts on submit
  this.alertService.clear();

  // stop here if form is invalid
  if (this.userForm.invalid) {
      return;
  }
  let currentUser = this.authenticationService.currentUserValue;
  debugger;
  this.loading = true;
  this.userService.saveProfile(this.userForm.value,currentUser.id)
      .pipe(first())
      .subscribe(
          data => {
              this.closeModal("custom-modal-1");
              this.notifyService.showSuccess('Profile Updated', 'Ezynaukari Says!!');
              this.loading = false;
              this.ngOnInit();
          },
          error => {
              this.notifyService.showError('Error in updating profile', 'Ezynaukari Says!!');
              this.loading = false;
          });
}


}
