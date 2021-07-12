import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Autocomplete } from './autocomplete';
import { NotificationService } from './notification.service';
import {MatChipInputEvent} from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
 
  public text : String;


  constructor() { 
   }

  ngOnInit() {
   
  }

  

 
 }
