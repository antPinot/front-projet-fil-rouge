import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material-module/material.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    HeaderComponent,
    SidenavComponent
  ]
})
export class CoreModule { }
