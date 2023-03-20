import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationVehiculeSocieteRoutingModule } from './reservation-vehicule-societe-routing.module';
import { EditReservationVehiculeComponent } from './components/edit-reservation-vehicule/edit-reservation-vehicule.component';
import { ListReservationVehiculeSocieteComponent } from './components/list-reservation-vehicule-societe/list-reservation-vehicule-societe.component';
import { NewReservationVehiculeSocieteComponent } from './components/new-reservation-vehicule-societe/new-reservation-vehicule-societe.component';
import { SingleReservationVehiculeComponent } from './components/single-reservation-vehicule/single-reservation-vehicule.component';


@NgModule({
  declarations: [
    ListReservationVehiculeSocieteComponent,
    SingleReservationVehiculeComponent,
    NewReservationVehiculeSocieteComponent,
    EditReservationVehiculeComponent
  ],
  imports: [
    CommonModule,
    ReservationVehiculeSocieteRoutingModule
  ],
  exports: [
    ListReservationVehiculeSocieteComponent,
    SingleReservationVehiculeComponent,
    NewReservationVehiculeSocieteComponent,
    EditReservationVehiculeComponent
  ]
})
export class ReservationVehiculeSocieteModule { }
