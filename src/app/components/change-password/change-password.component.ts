import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }
  isRecruiter:boolean = false;
  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser['roles'][0]==="ROLE_RECRUITER")
    {
      this.isRecruiter = true;
    }
  }

}
