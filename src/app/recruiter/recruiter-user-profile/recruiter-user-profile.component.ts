import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/notification.service';
import { Tag } from 'src/app/skills/skills.component';
import { ModalService } from 'src/app/_modal';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recruiter-user-profile',
  templateUrl: './recruiter-user-profile.component.html',
  styleUrls: ['./recruiter-user-profile.component.css']
})
export class RecruiterUserProfileComponent implements OnInit {

  userForm: FormGroup;
  user: any;
  educations: any;
  workExperiences: any;
  loading = false;
  submitted = false;
  skills: string[] = [];
  userProfile: any;
  tags: Tag[] = [

  ];



  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  url: any;
  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private jobService: JobService, private router: Router, private userService: UserService,
    private authenticationService: AuthenticationService, private modalService: ModalService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.userService.getUser(currentUser.id).subscribe((data) => {
        // debugger;
        console.log(data);
        this.user = data;
        if (data['recruiterProfile']) {
          let userProfile = data['recruiterProfile'];
          let profilePic =userProfile['profilePic'];
        if(profilePic)
        {
        this.url = environment.apiUrl+"getRecruiterProfilePic"+"/"+profilePic+"/"+currentUser.id;
        }
          this.userForm.patchValue(userProfile);
          this.userProfile = userProfile;
          Object.keys(userProfile['tags']).forEach((key) => {

            let skillName = userProfile['tags'][key];
            console.log(skillName);
            this.tags.push({ "name": skillName['name'] });
          })
        }
      }, (error) => {
        this.notifyService.showError("Error occured while loading user profile with message=" + error, "Ezynaukari says!!");
        this.router.navigate(['/profileLanding']);
      })

      this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        currentJobRole: ['', Validators.required],
        maxQualification: ['', Validators.required],
        workExperience: [''],
        currentLocation: [''],
        aboutMe: [''],
        faceBookUrl:[''],
        twitterUrl:[''],
        linkedinUrl:[''],
        googlePlusUrl:['']
      });

      // this.userService.getUser(currentUser.id).subscribe((data)=>{
      //   console.log(data);
      //   this.userForm.patchValue(data['recruiterProfile']);
      // })
    }

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.id) {
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      this.jobService.updateRecruiterProfilePic(formData,currentUser.id).subscribe((data)=>{
        this.loading= false;
        console.log(data);
        this.notifyService.showSuccess("Profile Pic has been updated","Ezynaukari says!!");
      });
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
  }
  }

  get f() { return this.userForm.controls; }

  open(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    //window.location.reload()

  }

  onSubmit() {
    this.submitted = true;
    // alert("submitting");
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    let currentUser = this.authenticationService.currentUserValue;
    // debugger;
    this.loading = true;
    this.userService.saveRecruiterProfile(this.userForm.value, currentUser.id)
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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  updateSkills() {
    let currentUser = this.authenticationService.currentUserValue;
    Object.keys(this.tags).forEach((tagName) => {
      let skillTag = this.tags[tagName];
      this.skills.push(skillTag['name']);

    })

    this.userService.addRecruiterSkills(JSON.stringify(this.skills), currentUser.id).subscribe((data) => {

      this.notifyService.showSuccess('Skills Updated', 'Ezynaukari Says!!');
      // this.loading = false;
    },
      error => {
        this.notifyService.showError('Error in updating Skills please try after some time', 'Ezynaukari Says!!');
        // this.loading = false;
      });
  }


}
