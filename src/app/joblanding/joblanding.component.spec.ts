import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblandingComponent } from './joblanding.component';

describe('JoblandingComponent', () => {
  let component: JoblandingComponent;
  let fixture: ComponentFixture<JoblandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoblandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
