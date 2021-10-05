import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService, AuthenticationService, UserService } from './_services';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JoblandingComponent } from './joblanding/joblanding.component';
import { AuthGuard, ErrorInterceptor, JwtInterceptor } from './_helpers';
import { PostjobComponent } from './postjob/postjob.component';
import { ModalModule } from './_modal';
import { JobDetailsComponent } from './job-details/job-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { BrowseJobsComponent } from './components/browse-jobs/browse-jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RecruiterComponent } from './components/recruiter/recruiter.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { DemoMaterialModule } from './material-module';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
// import {MatChipsModule} from '@angular/material/chips';





import {A11yModule} from '@angular/cdk/a11y';
// import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
// import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
// import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { ProfileLandingComponent } from './components/profile-landing/profile-landing.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrganizationComponent } from './organization/organization.component';
import { RecruiterHeaderComponent } from './recruiter-header/recruiter-header.component';
import { RecruiterProfileComponent } from './components/recruiter-profile/recruiter-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { OrganizationProfileComponent } from './components/organization-profile/organization-profile.component';
import { SafePipeModule } from 'safe-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { IndexComponent } from './components/index/index.component';
import { EmployeeProfileComponent } from './company-profile/employee-profile/employee-profile.component';
import { FindProfilesComponent } from './recruiter/find-profiles/find-profiles.component';
import { RecruiterUserProfileComponent } from './recruiter/recruiter-user-profile/recruiter-user-profile.component';
import { JobPostedComponent } from './recruiter/job-posted/job-posted.component';
import { ContactComponent } from './other-component/contact/contact.component';
import { AboutUsComponent } from './other-component/about-us/about-us.component';
import { SavedProfilesComponent } from './components/saved-profiles/saved-profiles.component';
import { ApplicationRecievedComponent } from './components/application-recieved/application-recieved.component';
import { AddcategoryComponent } from './recruiter/addcategory/addcategory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent,
    JoblandingComponent,
    PostjobComponent,
    JobDetailsComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    WorkExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ChangePasswordComponent,
    BrowseJobsComponent,
    RecruiterComponent,
    SavedJobsComponent,
    AppliedJobsComponent,
    ProfileLandingComponent,
    OrganizationComponent,
    CompanyProfileComponent,
    RecruiterHeaderComponent,
    RecruiterProfileComponent,
    OrganizationProfileComponent,
    IndexComponent,
    EmployeeProfileComponent,
    FindProfilesComponent,
    RecruiterUserProfileComponent,
    JobPostedComponent,
    ContactComponent,
    AboutUsComponent,
    SavedProfilesComponent,
    ApplicationRecievedComponent,
    AddcategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    AutocompleteLibModule,
    MatChipsModule,
    SafePipeModule, 
    // DemoMaterialModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgxPaginationModule,
    NgxSliderModule ,
    ToastrModule.forRoot(),
    


    A11yModule,
    // ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
