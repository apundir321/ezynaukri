import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedProfilesComponent } from './saved-profiles.component';

describe('SavedProfilesComponent', () => {
  let component: SavedProfilesComponent;
  let fixture: ComponentFixture<SavedProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
