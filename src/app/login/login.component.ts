import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;
    
    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe
    
      ((data) => {
                
                
          // debugger;
          console.log("data recieved from authenticate service with data=")
          console.log(data);
          let role = data['roles'][0];
          if (role === 'ROLE_EMPLOYEE') {
            this.router.navigate(['/joblanding']);
          } else if (role === 'ROLE_RECRUITER') {
            this.router.navigate(['/profileLanding']);
          }
        },
        (error) => {
          // alert("error="+error);
         
          this.notificationService.showError("Ezynaukri says!", "Invalid Credentials!");
          this.loading = false;this.submitted= false;
          this.router.navigate(['/login']);
        });
  }

}
