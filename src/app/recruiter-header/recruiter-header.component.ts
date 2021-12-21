import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-recruiter-header',
  templateUrl: './recruiter-header.component.html',
  styleUrls: ['./recruiter-header.component.css']
})
export class RecruiterHeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }
  recruiterId:any;
  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.recruiterId = currentUser.id;
  }
}

}
