import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { ModalService } from '../_modal';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { JobService } from '../_services/job.service';
export interface Tag {
  name: string;
}
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  user:any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [
   
  ];

  skills: string[]=[];

  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private jobService: JobService,private router:Router,private userService: UserService,
     private authenticationService: AuthenticationService,private modalService:ModalService,
     private formBuilder: FormBuilder,
     private alertService:AlertService) { }

     ngOnInit() {
      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.id) {
      this.userService.getUser(currentUser.id).subscribe((data)=>{
        
        let userProfile = data['userProfile'];
        Object.keys(userProfile['tags']).forEach((key)=>{
         
          let skillName = userProfile['tags'][key];
          console.log(skillName);
          this.tags.push({"name":skillName['name']});
        })
      },(error)=>{
        this.notifyService.showError("Error occured while loading user profile with message="+error,"Ezynaukari says!!");
        this.router.navigate(['/joblanding']);
      })
      }
  
    }

  

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  updateSkills()
  {
    let currentUser = this.authenticationService.currentUserValue;
    Object.keys(this.tags).forEach((tagName)=>{
      let skillTag = this.tags[tagName];
      this.skills.push(skillTag['name']);
      
    })
    
    this.userService.addSkills(JSON.stringify(this.skills),currentUser.id).subscribe((data)=>{
    
        this.notifyService.showSuccess('Skills Updated', 'Ezynaukari Says!!');
        // this.loading = false;
    },
    error => {
        this.notifyService.showError('Error in updating Skills please try after some time', 'Ezynaukari Says!!');
        // this.loading = false;
    });
  }

}
