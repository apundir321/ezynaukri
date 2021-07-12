import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterUserProfileComponent } from './recruiter-user-profile.component';

describe('RecruiterUserProfileComponent', () => {
  let component: RecruiterUserProfileComponent;
  let fixture: ComponentFixture<RecruiterUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
