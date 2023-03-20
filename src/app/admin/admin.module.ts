import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListReservationAdminComponent } from './components/list-reservation-admin/list-reservation-admin.component';
import { SingleReservationAdminComponent } from './components/single-reservation-admin/single-reservation-admin.component';


@NgModule({
  declarations: [
    ListReservationAdminComponent,
    SingleReservationAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    ListReservationAdminComponent,
    SingleReservationAdminComponent
  ]
})
export class AdminModule { }
