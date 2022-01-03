import { Options } from '@angular-slider/ngx-slider';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobTag } from 'src/app/components/browse-jobs/browse-jobs.component';
import { Task } from 'src/app/components/company-profile/company-profile.component';
import { NotificationService } from 'src/app/notification.service';
import { ModalService } from 'src/app/_modal';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-find-profiles',
  templateUrl: './find-profiles.component.html',
  styleUrls: ['./find-profiles.component.css']
})
export class FindProfilesComponent implements OnInit {

  users :any ;
  locationArray : string[] = [];
  tagsArray : string[] = [];
  categoryArray : string[] = [];
  
  location = new FormControl();
  locations = [];
  selectedLocations;

  serverUrl:string = environment.apiUrl;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  jobTags: JobTag[] = [
    
  ];
  config:any;
  searchJobTags: string[] = [];

  min:any;
  max:any;


  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };



  organization = new FormControl();
  organizations = ["Wipro","Flybunch","Capegemini"];
  selectedOrg;


  category = new FormControl();
  categories = ["It services","Food services","Manufactoring"];
  selectCategory;

  
  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private jobService: JobService,private router:Router,private userService: UserService,
     private authenticationService: AuthenticationService,private modalService:ModalService,
     private formBuilder: FormBuilder,
     private alertService:AlertService) { }

  ngOnInit() {
    this.userService.getLocations().subscribe((data)=>{
      console.log(data);
      Object.keys(data).forEach((key)=>{
        
        this.locations.push(data[key]['location']);
      })
    })
    this.userService.getEmployeesByParams(JSON.stringify({})).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.config = {
        currentPage: 1,
        itemsPerPage: 6,
        totalItems:0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );
    }, (error) => {
      this.notifyService.showError("Error occured while loading recuiter profiles with message=" + error, "Ezynaukari says!!");
      this.router.navigate(['/joblanding']);
    })
  }

  
  allComplete: boolean = false;

  updateLocation(name:string){
    if(!this.locationArray.includes(name)){
    this.locationArray.push(name);
    }else{
     let index =  this.locationArray.indexOf(name);
     if(index>-1)
     {
       this.locationArray.splice(index);
     }
    }
  }

  updateCategory(name:string){
    if(!this.categoryArray.includes(name)){
    this.categoryArray.push(name);
    }else{
     let index =  this.categoryArray.indexOf(name);
     if(index>-1)
     {
       this.categoryArray.splice(index);
     }
    }
  }

  updateTags(name:string){
    if(!this.tagsArray.includes(name)){
    this.tagsArray.push(name);
    }else{
     let index =  this.tagsArray.indexOf(name);
     if(index>-1)
     {
       this.tagsArray.splice(index);
     }
    }
  }

  submit()
  {
    var postData = {};
    if(this.locationArray.length>0)
    {
      postData['locations'] = this.locationArray;
    }
    if(this.tagsArray.length>0)
    {
      postData['tags'] = this.tagsArray;
    }
    this.userService.getRecruitersByParams(JSON.stringify(postData)).subscribe((data)=>{
      console.log(data);
      this.notifyService.showInfo("Ezynaukari says!","Refined results has been posted");
      this.users = data;
      this.config = {
        currentPage: 1,
        itemsPerPage: 3,
        totalItems:0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );
    })
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

  pageChange(newPage: number) {
		this.router.navigate(['/recruiters'], { queryParams: { page: newPage } });
	}

  filterProfiles()
  {
    // alert("filtering");
    var postData = {};
    if(this.selectedLocations && this.selectedLocations.length>0)
    {
      postData['locations'] = this.selectedLocations;
    }
    if(this.jobTags && this.jobTags.length>0)
    {
      postData['tags'] = this.searchJobTags;
    }
    if(this.min)
    {
      postData['minExperience'] = this.min;
    }
    if(this.max)
    {
      postData['maxExperience'] = this.max;
    }
    if(this.value)
    {
      postData['minSalary'] = this.value;
    }
    if(this.value)
    {
      postData['maxSalary'] = this.highValue;
    }
    this.userService.getEmployeesByParams(JSON.stringify(postData)).subscribe((data)=>{
      console.log(data);
      this.notifyService.showInfo("Ezynaukari says!","Refined results has been posted");
      this.users = data;
      this.config = {
        currentPage: 1,
        itemsPerPage: 3,
        totalItems:0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );
    })

  }


  saveProfile(userId: any)
  {
    // debugger;
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      let recruiterId = currentUser.id;
      this.userService.getSaveProfile(userId,recruiterId).subscribe((data)=>{
        // console.log(data);
        this.notifyService.showInfo("Ezynaukari says!","Profile has been saved!");
      },(err)=>{
        // debugger;
        this.notifyService.showError("Ezynaukari says!",err)
      });
    }
  }

  


  // updateAllComplete() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => t.completed = completed);
  // }

}
