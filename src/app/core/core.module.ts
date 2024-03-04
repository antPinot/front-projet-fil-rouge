import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material-module/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PreviousButtonComponent } from './components/previous-button/previous-button.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    PreviousButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule
  ],
  exports:[
    HeaderComponent,
    SidenavComponent
  ]
})
export class CoreModule { }
