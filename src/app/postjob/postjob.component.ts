import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { ModalService } from '../_modal';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { JobService } from '../_services/job.service';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {

  @ViewChild('myForm', { static: false }) myForm: NgForm;
  jobForm: FormGroup;
  orgForm: FormGroup;
  loading = false;
  submitted = false;
  orgs = [];
  categories = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private jobService: JobService,
    private alertService: AlertService,
    private modalService: ModalService,
    private notification: NotificationService
  ) {
    this.getOrgs();
  }

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
      id: [''],
      jobName: ['', Validators.required],
      jobLocation: ['', Validators.required],
      category: ['', Validators.required],
      minExperience: ['', Validators.required],
      maxExperience: ['', Validators.required],
      minSalary: ['', Validators.required],
      maxSalary: ['', Validators.required],
      orgName: [''],
      tags: ['', Validators.required],
      jobDescription: [''],
      noOfvacancies: [''],
      endDate: ['']

    });
    let jobId = this.route.snapshot.queryParamMap.get("jobId");
    if (jobId) {
      this.getJobDetail(jobId);
    }
    this.getCategories();
  }

  getJobDetail(jobId: any) {
    this.jobService.getJobDetail(jobId).subscribe(data => {
      console.log(data);
      // debugger;
      let tagsString = "";
      let jobData = data['job'];
      let tagsArray = jobData['tags'];
      
      for(let t of tagsArray)
      {
        tagsString += t['name']+",";
      }
      
      tagsString = tagsString.substring(0, tagsString.length - 1);
      jobData['tags']= tagsString;
      this.jobForm.patchValue(jobData);
      console.log(data)
    }
      , error => {
        this.notification.showError("Error in loading the page please try again later", "EzyNaukari says!!");
        this.router.navigate(['/joblanding']);
      }
    )
  }

  // convenience getter for easy access to form fields
  get f() { return this.jobForm.controls; }

  onSubmit() {
    this.submitted = true;
    let organizationId: any;
    let categoryId: any;
    let tags = [];
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.jobForm.invalid) {
      return;
    }
    let jobData = {};
    jobData['id'] = this.jobForm.controls.id.value;
    jobData['jobName'] = this.jobForm.controls.jobName.value;
    jobData['jobLocation'] = this.jobForm.controls.jobLocation.value;
    categoryId = this.jobForm.controls.category.value;
    organizationId = this.jobForm.controls.orgName.value;
    jobData['minExperience'] = this.jobForm.controls.minExperience.value;
    jobData['maxExperience'] = this.jobForm.controls.maxExperience.value;
    jobData['minSalary'] = this.jobForm.controls.minSalary.value;
    jobData['maxSalary'] = this.jobForm.controls.maxSalary.value;
    jobData['endDate'] = this.jobForm.controls.endDate.value;
    let tagsString = this.jobForm.controls.tags.value;
    let tagsStringArray = tagsString.split(',');
    Object.keys(tagsStringArray).forEach(element => {
      let tagValue = tagsStringArray[element];
      tags.push({ 'name': tagValue });
    })
    jobData['tags'] = tags;
    //jobData['tags'] = tags;
    jobData['jobDescription'] = this.jobForm.controls.jobDescription.value;
    jobData['noOfvacancies'] = this.jobForm.controls.noOfvacancies.value;
    // jobData['endDate'] = this.jobForm.controls.endDate.value;


    this.loading = true;
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser['id']) {
      const formData = new FormData();
      formData.append('job', JSON.stringify(jobData))
      this.jobService.postJob(formData, currentUser['id'], categoryId, organizationId)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Job Has been posted', true);
            this.loading = false;
            this.notification.showSuccess('Job Has been posted', 'EzyNaukari says!')
            // this.jobForm.reset();
            // Object.keys(this.jobForm.controls).forEach(key => {
            //   this.jobForm.get(key).setErrors(null) ;
            // });
            // this.myForm.resetForm();
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }

  private getOrgs() {
    this.jobService.getOrgs().subscribe((data) => {
      let array = [];
      Object.keys(data).forEach(element => {
        let orgElement = data[element];
        array.push(orgElement)
      });
      this.orgs = array;
    })
  }

  private getCategories() {
    this.jobService.getCategories().subscribe((data) => {
      let array = [];
      Object.keys(data).forEach(element => {
        let orgElement = data[element];
        array.push(orgElement)
      });
      this.categories = array;
    })
  }



}
