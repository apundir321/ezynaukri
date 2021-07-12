import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostedComponent } from './job-posted.component';

describe('JobPostedComponent', () => {
  let component: JobPostedComponent;
  let fixture: ComponentFixture<JobPostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
