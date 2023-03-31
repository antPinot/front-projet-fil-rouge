import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovoiturageRoutingModule } from './covoiturage-routing.module';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { SingleCovoiturageComponent } from './components/single-covoiturage/single-covoiturage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material-module/material.module';
import { ReservationCovoiturageModule } from '../reservation-covoiturage/reservation-covoiturage.module';


@NgModule({
  declarations: [
    CovoiturageComponent,
    CovoiturageListComponent ,
    SingleCovoiturageComponent,
    CovoiturageDetailsComponent
  ],
  imports: [
    CommonModule,
    CovoiturageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ReservationCovoiturageModule
  ],
  exports: [
    CovoiturageComponent,
    CovoiturageListComponent ,
    SingleCovoiturageComponent,
    CovoiturageDetailsComponent
  ]
})
export class CovoiturageModule { }
