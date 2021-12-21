import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';
import { environment } from 'src/environments/environment';
export interface JobTag {
  name: string;
}
@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.component.html',
  styleUrls: ['./profile-landing.component.css']
})
export class ProfileLandingComponent implements OnInit {
  users: any;
  title = 'Autocomplete';
  countryValue = '';
  // locations:any;
  myControl = new FormControl();
  options: string[] = ['Gurgaon', 'Delhi', 'Banglore'];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  jobTags: JobTag[] = [
    
  ];
  browseForm:FormGroup;


  location = new FormControl();
  locations = ["Gurgaon"];
  selectedLocations;



  selectMaxExperience: string;
  selectMinValue: string;

  

  searchJobTags: string[] = [];
  
  serverUrl:string = environment.apiUrl;


  config:any;
  totalPages:any;
  findJobsCount:number =0;
  
  constructor(private route: ActivatedRoute,private jobService: JobService, private authenticationService: AuthenticationService,
    private router:Router,private notifyService : NotificationService,private formBuilder:FormBuilder,private userService:UserService) { }
    ngOnInit() {
      this.browseForm = this.formBuilder.group({
        location: [null,Validators.required]
      });
      this.userService.getLocations().subscribe((data)=>{
        console.log(data);
        Object.keys(data).forEach((key)=>{
        
          this.locations.push(data[key]['location']);
        })
      })

      this.userService.getEmployeesByParams(JSON.stringify({})).subscribe((data) => {
        debugger;
        console.log(data);
        this.users = data;
        
        // this.totalPages= new Array(data['pagesJob']['totalPages']);
        // this.findJobsCount = data['pagesJob']['totalElements'];
        this.config = {
          currentPage: 1,
          itemsPerPage: 6,
          totalItems: data['length']
        };
        this.route.queryParams.subscribe(
          params => this.config.currentPage = params['page'] ? params['page'] : 1);
      
      }, (error) => {
        this.notifyService.showError("Error occured while loading recuiter profiles with message=" + error, "Ezynaukari says!!");
        this.router.navigate(['/profileLanding']);
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

  filterJobs()
  {
    alert("filtering");
    var postData = {};
    if(this.selectedLocations && this.selectedLocations.length>0)
    {
      postData['locations'] = this.selectedLocations;
    }
    if( this.jobTags && this.jobTags.length>0)
    {
      postData['tags'] = this.searchJobTags;
    }

    if(this.selectMinValue)
    {
      postData['minExperience'] = this.selectMinValue;
    }

    if(this.selectMaxExperience)
    {
      postData['maxExperience'] = this.selectMaxExperience;
    }
    this.userService.getEmployeesByParams(JSON.stringify(postData)).subscribe((data)=>{
      console.log(data);
      this.notifyService.showInfo("Ezynaukari says!","Refined results has been posted");
      this.users = data;
      this.config = {
        currentPage: 1,
        itemsPerPage: 6,
        totalItems:0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );
    })
  }

  pageChange(newPage: number) {
    this.router.navigate(['profileLanding'], { queryParams: { page: newPage } });
  }



 

 

}
