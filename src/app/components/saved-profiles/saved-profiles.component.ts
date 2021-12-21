import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { ModalService } from 'src/app/_modal';
import { AlertService, AuthenticationService, UserService } from 'src/app/_services';
import { JobService } from 'src/app/_services/job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-saved-profiles',
  templateUrl: './saved-profiles.component.html',
  styleUrls: ['./saved-profiles.component.css']
})
export class SavedProfilesComponent implements OnInit {

  profiles :any ;
  serverUrl:string = environment.apiUrl;
  id:any;
  config: any;
  constructor(private route: ActivatedRoute, private notifyService: NotificationService,
    private jobService: JobService,private router:Router,private userService: UserService,
     private authenticationService: AuthenticationService,private modalService:ModalService,
     private formBuilder: FormBuilder,
     private alertService:AlertService) { }

  ngOnInit() {
    
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.id = currentUser.id;
    this.userService.getSavedProfiles(currentUser.id).subscribe((data) => {
      console.log(data);
      this.profiles = data;

      this.config = {
        currentPage: 1,
        itemsPerPage: 6,
        totalItems: data['length']
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage = params['page'] ? params['page'] : 1);
    
    });
  }

  }

  pageChange(newPage: number) {
    this.router.navigate(['saved-profiles'], { queryParams: { page: newPage } });
  }

  deleteSavedProfile(savedProfileId: any)
  {
          this.userService.deleteSavedProfile(savedProfileId).subscribe((data)=>{
        // console.log(data);
        this.notifyService.showSuccess("Ezynaukari says!","Saved Profile delted!");
        this.ngOnInit();

      });
    }
  

}
