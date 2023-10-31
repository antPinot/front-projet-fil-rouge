import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationCovoiturageRoutingModule } from './reservation-covoiturage-routing.module';
import { MaterialModule } from '../core/material-module/material.module';
import { DetailReservationCovoiturageComponent } from './components/detail-reservation-covoiturage/detail-reservation-covoiturage.component';
import { ListReservationCovoiturageComponent } from './components/list-reservation-covoiturage/list-reservation-covoiturage.component';
import { SearchCovoiturageComponent } from './components/search-covoiturage/search-covoiturage.component';
import { SingleReservationCovoiturageComponent } from './components/single-reservation-covoiturage/single-reservation-covoiturage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    SingleReservationCovoiturageComponent,
    ListReservationCovoiturageComponent,
    DetailReservationCovoiturageComponent,
    SearchCovoiturageComponent
  ],
  imports: [
    CommonModule,
    ReservationCovoiturageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    LeafletModule
  ],
  exports: [
    SingleReservationCovoiturageComponent,
    ListReservationCovoiturageComponent,
    DetailReservationCovoiturageComponent,
    SearchCovoiturageComponent
  ]
})
export class ReservationCovoiturageModule { }
