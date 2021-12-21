import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/notification.service';
import { Tag } from 'src/app/skills/skills.component';
import { ModalService } from 'src/app/_modal';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-job-posted',
  templateUrl: './job-posted.component.html',
  styleUrls: ['./job-posted.component.css']
})
export class JobPostedComponent implements OnInit {


  userForm: FormGroup;
  students:any;
  user : any;
  educations: any;
  workExperiences: any;
  loading = false;
  submitted = false;
  skills: string[] = [];
  userProfile: any;
  tags: Tag[] = [

  ];
  jobs:any;
  
  url: any;
  config : any;
  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private jobService: JobService, private router: Router, private userService: UserService,
    private authenticationService: AuthenticationService, private modalService: ModalService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.userService.getUser(currentUser.id).subscribe((data) => {
        // console.log(data);
        this.user = data;
        if (data['recruiterProfile']) {
          let userProfile = data['recruiterProfile'];
          this.userProfile = userProfile;
          Object.keys(userProfile['tags']).forEach((key) => {

            let skillName = userProfile['tags'][key];
            // console.log(skillName);
            this.tags.push({ "name": skillName['name'] });
          })
        }
      }, (error) => {
        this.notifyService.showError("Error occured while loading user profile with message=" + error, "Ezynaukari says!!");
        this.router.navigate(['/profileLanding']);
      })

      // this.userService.getUser(currentUser.id).subscribe((data)=>{
      //   console.log(data);
      //   this.userForm.patchValue(data['recruiterProfile']);
      // })
      let postData = {};

      let profileId = currentUser.id;
      postData['posted_by'] = profileId;


      this.jobService.getJobsById(JSON.stringify(postData)).subscribe(jobsData => {
        console.log(jobsData);
        if (jobsData['jobs']) {
          this.jobs = jobsData['jobs'];
          this.config = {
            currentPage: 1,
            itemsPerPage: 6,
            totalItems: 0
          };
          this.route.queryParams.subscribe(
            params => this.config.currentPage = params['page'] ? params['page'] : 1);
          }
      });
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

  open(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    //window.location.reload()

  }

  pageChange(newPage: number) {
    this.router.navigate(['job-posted'], { queryParams: { page: newPage } });
  }
  
  

}
