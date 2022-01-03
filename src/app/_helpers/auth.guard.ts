import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { JobService } from '../_services/job.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private jobService:JobService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // debugger;

            let appliedJobs = localStorage.getItem("appliedJobs");
            if(!appliedJobs)
            {
                let jobApplied = {};
                let jobs = [];
                this.jobService.getAppliedJobs(currentUser.id).subscribe((data)=>{
                    let appliedJobsData = data['pagesJob']['content'];
                    Object.keys(appliedJobsData).forEach((key)=>{
                        let jobData = appliedJobsData[key];
                        jobs.push(jobData.job.id);

                    })
                    jobApplied[currentUser.id] = jobs;
                    localStorage.setItem("appliedJobs",JSON.stringify(jobs));
                });
            }
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}