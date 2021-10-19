import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification.service';
// import { Console } from 'console';
import { AuthenticationService, UserService } from '../_services';
import { JobService } from '../_services/job.service';
export interface JobTag {
  name: string;
}
@Component({
  selector: 'app-joblanding',
  templateUrl: './joblanding.component.html',
  styleUrls: ['./joblanding.component.css']
})
export class JoblandingComponent implements OnInit {
  loading = false;
  title = 'Autocomplete';
  // locations:any;
  browseForm: FormGroup;
  jobData : any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  jobTags: JobTag[] = [
    
  ];
  user : any;
  config:any;

  searchJobTags: string[] = [];

  location = new FormControl();

  locations = ["Gurgaon"];
  selectedLocations;

  url:any;
  
  

  
  totalPages:any;
  findJobsCount:number =0;
  constructor(private route: ActivatedRoute,private router: Router,private jobService: JobService, private authenticationService: AuthenticationService,
    private notifyService : NotificationService,private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.userService.getLocations().subscribe((data)=>{
      console.log(data);
      Object.keys(data).forEach((key)=>{
        
        this.locations.push(data[key]['location']);
      })
    })
    this.browseForm = this.formBuilder.group({
      location: [null,Validators.required]
    });
    this.jobService.getAll().subscribe((data) => {
      console.log(data);
      let jobListData = data.pagesJob.content;
      // console.log(jobListData);
      Object.keys(jobListData).forEach((job)=>{
        let jobData = jobListData[job];
        let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
        if(appliedJobs)
        {
          if(appliedJobs.includes(jobData.id))
          {
            jobData['applied'] = true;
          }
        }
      })
      debugger;

      this.jobData = jobListData;
      console.log(this.jobData);
      this.totalPages= new Array(data.pagesJob.totalPages);
      this.findJobsCount = data.pagesJob.totalElements;
      console.log(this.findJobsCount);
      this.config = {
        currentPage: 1,
        itemsPerPage: 3,
        totalItems:0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );
  

    }, (error) => {
      console.log("error in getting jobdata from jobservice");
    })

    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
    this.userService.getUser(currentUser.id).subscribe((data)=>{
      console.log(data);
      this.user = data;
      if(data['userProfile']){
        let userProfile = data['userProfile'];
        let profilePic =userProfile['profilePicName'];
        if(profilePic)
        {
          this.url = environment.apiUrl+"getProfilePic"+"/"+profilePic+"/"+currentUser.id;
        }
      }
    });
  }
  }

  pageChange(newPage: number) {
		this.router.navigate(['/joblanding'], { queryParams: { page: newPage } });
	}

  applyJob(jobId: string) {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.jobService.applyJob(jobId, currentUser.id).subscribe((data)=>{
        console.log("Job Applied Successfully");
        let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
        appliedJobs.push(jobId);
        localStorage.setItem("appliedJobs",JSON.stringify(appliedJobs));
        this.notifyService.showSuccess("Job Applied","EzyNaukri Says!!")
        this.ngOnInit();
      })
    }
  }

  saveJob(jobId: string) {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.jobService.save(jobId, currentUser.id).subscribe((data)=>{
        debugger;
        console.log("Job saved Successfully");
        if(data['message']==="Job Already Saved")
        {
          this.notifyService.showWarning("Job Already Saved","EzyNaukri Says!!")
        }else{
        // let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
        // appliedJobs.push(jobId);
        // localStorage.setItem("appliedJobs",JSON.stringify(appliedJobs));
        this.notifyService.showSuccess("Job saved","EzyNaukri Says!!")
      }
        this.ngOnInit();
      })
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;
        this.url = reader.result;
      }
    }
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.jobTags.push({name: value.trim()});
      this.searchJobTags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    
  }

  remove(jobTag: JobTag): void {
    const index = this.jobTags.indexOf(jobTag);

    if (index >= 0) {
      this.jobTags.splice(index, 1);
    }
  }

  filterJobs()
  {
    debugger;
    var postData = {};
    if(this.selectedLocations.length>0)
    {
      postData['locations'] = this.selectedLocations;
    }
    if(this.jobTags.length>0)
    {
      postData['tags'] = this.searchJobTags;
    }
    this.jobService.getFilterByTags(JSON.stringify(postData)).subscribe((data)=>{
      console.log(data);
      let jobListData = data['pagesJob'].content;
      // console.log(jobListData);
      Object.keys(jobListData).forEach((job)=>{
        let jobData = jobListData[job];
        let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs"));
        if(appliedJobs)
        {
          if(appliedJobs.includes(jobData.id))
          {
            jobData['applied'] = true;
          }
        }
      })
      this.jobData = jobListData;
      console.log(this.jobData);
      this.totalPages= new Array(data['pagesJob'].totalPages);
      this.findJobsCount = data['pagesJob'].totalElements;
      console.log(this.findJobsCount);
      this.notifyService.showInfo("Ezynaukari says!","Refined results has been posted");
    })

  }

  
  // convenience getter for easy access to form fields
  get f() { return this.browseForm.controls; }

  // onSubmit() {
  //   let tagArray = [];
  //   this.loading = true;
    
  //   if (this.browseForm.invalid) {
  //     return;
  //   }

  //   Object.keys(this.jobTags).forEach((key)=>{
  //     let tagValue = this.jobTags[key];
  //     tagArray.push(tagValue.name);
  //   })

  //   this.jobService.getFilterByTags(JSON.stringify(tagArray),this.f.location.value).subscribe((data)=>{
  //     this.loading = false;
  //     this.jobData = data['jobs'];
  //   })



    
  // }


}
