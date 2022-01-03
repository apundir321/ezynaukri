import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { first } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private notifyService:NotificationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            cpassword:['',[Validators.required, Validators.minLength(6)]],
            phoneNo:['',Validators.required],
            isRecruiter:[false]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        // debugger;
        this.loading = true;
        this.userService.register(this.registerForm.value,this.f.isRecruiter.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                    this.notifyService.showSuccess('Registration successful', 'Ezynaukari Says!!');
                    this.loading = false;
                },
                error => {
                    this.notifyService.showError('Error in registering this user', 'Ezynaukari Says!!');
                    this.loading = false;
                });
    }

}
