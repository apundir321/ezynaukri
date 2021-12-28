import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private notification:NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.notification.showSuccess("Ezynaukri Says!","You have been logged out!")
    this.router.navigate(['/login']);
    // this.currentUserSubject.next(null);
}

}
