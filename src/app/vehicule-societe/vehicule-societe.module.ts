import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculeSocieteRoutingModule } from './vehicule-societe-routing.module';
import { DetailVehiculeSocieteComponent } from './components/detail-vehicule-societe/detail-vehicule-societe.component';
import { EditVehiculeSocieteComponent } from './components/edit-vehicule-societe/edit-vehicule-societe.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';
import { SingleVehiculeSocieteComponent } from './components/single-vehicule-societe/single-vehicule-societe.component';


@NgModule({
  declarations: [
    NewVehiculeSocieteComponent,
    ListVehiculeSocieteComponent,
    SingleVehiculeSocieteComponent,
    DetailVehiculeSocieteComponent,
    EditVehiculeSocieteComponent
  ],
  imports: [
    CommonModule,
    VehiculeSocieteRoutingModule
  ],
  exports: [
    NewVehiculeSocieteComponent,
    ListVehiculeSocieteComponent,
    SingleVehiculeSocieteComponent,
    DetailVehiculeSocieteComponent,
    EditVehiculeSocieteComponent
  ]
})
export class VehiculeSocieteModule { }
