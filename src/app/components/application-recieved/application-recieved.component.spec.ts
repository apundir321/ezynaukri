import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRecievedComponent } from './application-recieved.component';

describe('ApplicationRecievedComponent', () => {
  let component: ApplicationRecievedComponent;
  let fixture: ComponentFixture<ApplicationRecievedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRecievedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
