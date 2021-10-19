import { Component, OnInit } from '@angular/core';
import { Autocomplete } from 'src/app/autocomplete';
import * as $ from 'jquery';
import { UserService } from 'src/app/_services';
import { NotificationService } from 'src/app/notification.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/_services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';

export interface JobTag {
  name: string;
}

export interface Category {
  name: string;
}
@Component({
  selector: 'app-browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.css']
})
export class BrowseJobsComponent implements OnInit {
  loading = false;
  title = 'Autocomplete';
  browseForm: FormGroup;
  categories : any;
  // myControl = new FormControl();
  jobData: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  jobTags: JobTag[] = [

  ];

  location = new FormControl();

  locations = [];
  selectedLocations;




  config: any;
  totalPages:any;
  findJobsCount:number =0;

  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };



  category: Category[] = [
    { name: 'Steak' },
    { name: 'Pizza' },
    { name: 'Tacos' }
  ];
  selectedCategory: string;



  organization = new FormControl();

  organizations = ["Wipro", "Flybunch", "Capegemini"];
  selectedOrg;

  constructor(private router: Router, private userService: UserService, private notifyService: NotificationService,
    private formBuilder: FormBuilder, private jobService: JobService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.userService.getLocations().subscribe((data) => {
      console.log(data);
      Object.keys(data).forEach((key) => {

        this.locations.push(data[key]['location']);
      })
    })

    this.jobService.getFilterByTags(JSON.stringify({})).subscribe((data) => {
      let jobListData = data['pagesJob'].content;
      // console.log(jobListData);
      Object.keys(jobListData).forEach((job) => {
        let jobData = jobListData[job];
        let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
        if (appliedJobs) {
          if (appliedJobs.includes(jobData.id)) {
            jobData['applied'] = true;
          }
        }
      })
      this.jobData = jobListData;
      console.log(this.jobData);
      this.totalPages= new Array(data['pagesJob']['totalPages']);
      this.findJobsCount = data['pagesJob']['totalElements'];
      this.loading = false;
      this.config = {
        currentPage: 1,
        itemsPerPage: 5,
        totalItems: 10
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage = params['page'] ? params['page'] : 1);


    })

    this.jobService.getCategories().subscribe((data)=>{
      console.log(data);
      this.categories = data;
    })
    // this.browseForm = this.formBuilder.group({
    //   location: [null,Validators.required]
    // });


  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.jobTags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  pageChange(newPage: number) {
    this.router.navigate(['browse-jobs'], { queryParams: { page: newPage } });
  }


  remove(jobTag: JobTag): void {
    const index = this.jobTags.indexOf(jobTag);

    if (index >= 0) {
      this.jobTags.splice(index, 1);
    }
  }


  // convenience getter for easy access to form fields
  get f() { return this.browseForm.controls; }

  onSubmit() {
    debugger;
    let tagArray = [];
    this.loading = true;


    Object.keys(this.jobTags).forEach((key) => {
      let tagValue = this.jobTags[key];
      tagArray.push(tagValue.name);
    })


    var postData = {};
    if (this.selectedLocations) {
      if (this.selectedLocations.length > 0) {
        postData['locations'] = this.selectedLocations;
      }
    }
    if (tagArray.length > 0) {
      postData['tags'] = tagArray;
    }

    this.jobService.getFilterByTags(JSON.stringify(postData)).subscribe((data) => {
      let jobListData = data['pagesJob'].content;
      // console.log(jobListData);
      Object.keys(jobListData).forEach((job) => {
        let jobData = jobListData[job];
        let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
        if (appliedJobs) {
          if (appliedJobs.includes(jobData.id)) {
            jobData['applied'] = true;
          }
        }
      })
      this.jobData = jobListData;
      console.log(this.jobData);
      this.loading = false;
      this.config = {
        currentPage: 1,
        itemsPerPage: 3,
        totalItems: 0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage = params['page'] ? params['page'] : 1);


    })
  }




  // }

}
