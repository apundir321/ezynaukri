import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { ModalService } from '../_modal';
import { AlertService, AuthenticationService } from '../_services';
import { JobService } from '../_services/job.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  orgForm : FormGroup;
  loading = false;
  submitted = false;

  categories : any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private jobService: JobService,
    private alertService: AlertService,
    private modalService: ModalService,
    private notification:NotificationService
  ) {
    
  }

  ngOnInit() {
    

    this.orgForm = this.formBuilder.group({
      organizationName: ['', Validators.required],
      website:[''],
      organizationDescription: [''],
      profile:[''],
      categoryName:[''],
      location:['',Validators.required]
    });

    this.jobService.getCategories().subscribe((data)=>{
      console.log(data);
      this.categories = data;
    })

  }

  get f() { return this.orgForm.controls; }

  onOrgSubmit() {
    
    this.submitted = true;
   
    let organization = {};
    let category = {};
    // reset alerts on submit
    this.alertService.clear();
    
  
    // stop here if form is invalid
    if (this.orgForm.invalid) {
      return;
    }
    this.loading = true;
    let orgData = {};
    let categoryId = this.orgForm.controls.categoryName.value;
    orgData['name'] = this.orgForm.controls.organizationName.value;
    orgData['description'] = this.orgForm.controls.organizationDescription.value;
    orgData['location'] = this.orgForm.controls.location.value;
    // orgData['description'] = this.orgForm.controls.organizationDescription.value;
    const formData = new FormData();
    formData.append('file', this.orgForm.get('profile').value);
    formData.append('orgData',JSON.stringify(orgData));
    this.jobService.postOrganization(formData,categoryId).subscribe((data)=>{
      this.loading= false;
      console.log(data);
      this.notification.showSuccess("Organization has been added","Ezynaukari says!!");
    });
  
  }

  onFileSelect(event) {
    // alert(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.orgForm.get('profile').setValue(file);
    }
  }


}
