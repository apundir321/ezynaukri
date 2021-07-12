import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeProfileComponent } from './company-profile/employee-profile/employee-profile.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { BrowseJobsComponent } from './components/browse-jobs/browse-jobs.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { IndexComponent } from './components/index/index.component';
import { OrganizationProfileComponent } from './components/organization-profile/organization-profile.component';
import { ProfileLandingComponent } from './components/profile-landing/profile-landing.component';
import { RecruiterProfileComponent } from './components/recruiter-profile/recruiter-profile.component';
import { RecruiterComponent } from './components/recruiter/recruiter.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { EducationComponent } from './education/education.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JoblandingComponent } from './joblanding/joblanding.component';
import { LoginComponent } from './login/login.component';
import { OrganizationComponent } from './organization/organization.component';
import { PostjobComponent } from './postjob/postjob.component';
import { FindProfilesComponent } from './recruiter/find-profiles/find-profiles.component';
import { JobPostedComponent } from './recruiter/job-posted/job-posted.component';
import { RecruiterUserProfileComponent } from './recruiter/recruiter-user-profile/recruiter-user-profile.component';
import { SignupComponent } from './signup/signup.component';
import { SkillsComponent } from './skills/skills.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { AuthGuard } from './_helpers';


const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  
  {
    path: 'joblanding', component: JoblandingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'postjob', component: PostjobComponent, canActivate: [AuthGuard]
  }, {
    path: 'job-details', component: JobDetailsComponent, canActivate: [AuthGuard]
  }, {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]
  }
  ,
  {
    path: 'work-experience', component: WorkExperienceComponent, canActivate: [AuthGuard]
  }
  ,
  {
    path: 'education', component: EducationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'skills', component: SkillsComponent, canActivate: [AuthGuard]
  }
  ,
  {
    path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthGuard]
  },
  {
    path: 'browse-jobs', component: BrowseJobsComponent,  canActivate: [AuthGuard]
  }

  ,
  {
    path: 'recruiters', component: RecruiterComponent,  canActivate: [AuthGuard]

  }
  ,
  {
    path: 'saved-jobs', component: SavedJobsComponent, canActivate: [AuthGuard]
  }
  ,
  {
    path: 'applied-jobs', component: AppliedJobsComponent,  canActivate: [AuthGuard]
  },
  {
    path: 'companies', component: CompanyProfileComponent,  canActivate: [AuthGuard]
  },
  {
    path: 'org-profile', component: OrganizationProfileComponent,  canActivate: [AuthGuard]
  },
  {
    path: 'profileLanding', component: ProfileLandingComponent,  canActivate: [AuthGuard]
  }
  ,
  {
    path: 'addOrganization', component: OrganizationComponent,  canActivate: [AuthGuard]
  }
  ,
  {
    path: 'recruiterProfile', component: RecruiterProfileComponent,  canActivate: [AuthGuard]
  },
  {
    path: 'employeeProfile', component: EmployeeProfileComponent,  canActivate: [AuthGuard]
  },
  {
    path: 'findProfiles', component: FindProfilesComponent,  canActivate: [AuthGuard]
  }
  ,
  {
    path: 'recruiterUserProfile', component: RecruiterUserProfileComponent,  canActivate: [AuthGuard]
  }
  ,
  {
    path: 'job-posted', component: JobPostedComponent,  canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
