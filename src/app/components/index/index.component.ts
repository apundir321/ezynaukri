import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
 
  isshow = false;
  jobData: any;
  allJobs: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  jobTags: JobTag[] = [

  ];

  config: any;

  searchJobTags: string[] = [];

  location = new FormControl();

  locations = [];
  
  selectedLocations;

  url: any;



  constructor(private route: ActivatedRoute, private router: Router, private jobService: JobService, private authenticationService: AuthenticationService,
    private notifyService: NotificationService, private formBuilder: FormBuilder, private userService: UserService) { }


  ngOnInit() {


this.loadJS();


    this.url = environment.apiUrl;
    // const target = document.querySelector('.tw');
    // const writer = new Typewriter(target, {
    //   loop: true,
    //   typeColor: 'blue'
    // })
    
    // writer
    //   .type('A simple syntax makes it easy.')
    //   .rest(500)
    //   .start()
    

    this.userService.getLocations().subscribe((data) => {
      console.log(data);
      Object.keys(data).forEach((key) => {

        this.locations.push(data[key]['location']);
      })
    })

    this.jobService.getAll().subscribe((data) => {
      console.log(data);
      let filteredData = [];
      let jobListData = data['pagesJob'].content;
      

        if (jobListData.length > 5) {
          for (let index = 0; index < 5; index++) {
            const element = jobListData[index];
            filteredData.push(element);

          }
          this.allJobs = filteredData;
        } else {
          this.allJobs = jobListData;
        }

      
      // this.notifyService.showInfo("Ezynaukari says!", "Refined results has been posted");
    },(err)=>{
      this.notifyService.showError("Ezynaukari says!", "Something went wrong please try again later!");
    })

  }


loadJS(){

  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


}


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.jobTags.push({ name: value.trim() });
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

  filterJobs() {
    // debugger;
    var postData = {};
    let filteredData = [];
    if (this.selectedLocations && this.selectedLocations.length > 0) {
      postData['locations'] = this.selectedLocations;
    }
    if (this.jobTags && this.jobTags.length > 0) {
      postData['tags'] = this.searchJobTags;
    }
    this.jobService.getFilterByTags(JSON.stringify(postData)).subscribe((data) => {
      console.log(data);

      let jobListData = data['pagesJob'].content;
      if (jobListData.length > 5) {
        for (let index = 0; index < 5; index++) {
          const element = jobListData[index];
          filteredData.push(element);
        }
        this.jobData = filteredData;
      } else {
        this.jobData = jobListData;
      }
      this.notifyService.showInfo("Ezynaukari says!", "Refined results has been posted");
    },(err)=>{
      this.notifyService.showError("Ezynaukari says!", "Something went wrong please try again later!");
    })

  }

  category() {
    this.isshow=!this.isshow;
  }
 

}
