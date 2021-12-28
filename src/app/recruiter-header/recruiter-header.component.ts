import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-recruiter-header',
  templateUrl: './recruiter-header.component.html',
  styleUrls: ['./recruiter-header.component.css']
})
export class RecruiterHeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private router: Router,private notification:NotificationService) { }
  recruiterId:any;
  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.recruiterId = currentUser.id;
  }
}

logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('currentUser');
  this.notification.showSuccess("Ezynaukri Says!","You have been logged out!")
  this.router.navigate(['/login']);
  // this.currentUserSubject.next(null);
}

}
