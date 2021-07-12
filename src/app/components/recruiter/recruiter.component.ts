import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { ModalService } from 'src/app/_modal';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface JobTag {
name: string;
}
@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {

  users :any ;
  locationArray : string[] = [];
  tagsArray : string[] = [];
  categoryArray : string[] = [];
  
  location = new FormControl();
  locations = ["Gurgaon"];
  selectedLocations;



  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  jobTags: JobTag[] = [
    
  ];
  config:any;
  searchJobTags: string[] = [];
  
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
    this.userService.getRecruitersByParams(JSON.stringify({})).subscribe((data) => {
      console.log(data);
      this.users = data;
      this.config = {
        currentPage: 1,
        itemsPerPage: 3,
        totalItems:0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );
    }, (error) => {
      this.notifyService.showError("Error occured while loading recuiter profiles with message=" + error, "Ezynaukari says!!");
      this.router.navigate(['/joblanding']);
    })
  }

  places: Task = {
    name: 'Location',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Gurgaon', completed: false, color: 'primary'},
      {name: 'Faridabad', completed: false, color: 'primary'},
      {name: 'noida', completed: false, color: 'primary'}
    ]
  };

  categories: Task = {
    name: 'category',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'It services', completed: false, color: 'primary'},
      {name: 'Food services', completed: false, color: 'primary'},
      {name: 'Manufactoring', completed: false, color: 'primary'}
    ]
  };

  tags: Task = {
    name: 'Tags',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'java', completed: false, color: 'primary'},
      {name: 'Sql', completed: false, color: 'primary'},
      {name: 'html', completed: false, color: 'primary'}
    ]
  };

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
