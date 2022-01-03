import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { ModalService } from '../../_modal';
import { AlertService, AuthenticationService } from '../../_services';
import { JobService } from '../../_services/job.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  categoryForm : FormGroup;
  loading = false;
  submitted = false;
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
    
 
    this.categoryForm= this.formBuilder.group({
      jobCategoryCode: ['', Validators.required],
      jobCategoryName:['',Validators.required],
      description: [''],
    });


  }

  get f() { return this.categoryForm.controls; }

  onCategorySubmit() {
    // debugger;
    this.submitted = true;
    this.loading = true;
    
    // reset alerts on submit
    this.alertService.clear();
  
    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      this.loading = false;
      return;
    }
    // let orgData = {};
    // orgData['categoryCode'] = this.categoryForm.controls.categoryCode.value;
    // orgData['description'] = this.categoryForm.controls.description.value;
    // orgData['category_name']=this.categoryForm.controls.categoryName.value;
    
    this.jobService.addCategory(this.categoryForm.value).subscribe((data)=>{
      this.loading= false;
      console.log(data);
      this.notification.showSuccess("category has been added","Ezynaukari says!!");
    })
  
  }
}
