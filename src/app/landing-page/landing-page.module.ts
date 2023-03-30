import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MaterialModule } from '../core/material-module/material.module';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }
