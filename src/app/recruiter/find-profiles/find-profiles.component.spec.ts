import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProfilesComponent } from './find-profiles.component';

describe('FindProfilesComponent', () => {
  let component: FindProfilesComponent;
  let fixture: ComponentFixture<FindProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
