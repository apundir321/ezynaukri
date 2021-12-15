import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { ModalService } from 'src/app/_modal';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';

@Component({
  selector: 'app-application-recieved',
  templateUrl: './application-recieved.component.html',
  styleUrls: ['./application-recieved.component.css']
})
export class ApplicationRecievedComponent implements OnInit {

  profiles :any ;

  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private jobService: JobService,private router:Router,private userService: UserService,
     private authenticationService: AuthenticationService,private modalService:ModalService,
     private formBuilder: FormBuilder,
     private alertService:AlertService) { }

  ngOnInit() {
    
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
    this.userService.getApplicationRecieved(currentUser.id).subscribe((data) => {
      console.log(data);
      this.profiles = data['jobApplication'];
    });
  }

  }

}
