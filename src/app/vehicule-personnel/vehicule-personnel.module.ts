import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculePersonnelRoutingModule } from './vehicule-personnel-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { SingleVehiculePersonnelComponent } from './components/single-vehicule-personnel/single-vehicule-personnel.component';
import { EditVehiculePersonnelComponent } from './components/edit-vehicule-personnel/edit-vehicule-personnel.component';


@NgModule({
  declarations: [NewVehiculePersonnelComponent,
    ListVehiculePersonnelComponent,
    SingleVehiculePersonnelComponent,
    EditVehiculePersonnelComponent],

  imports: [
    CommonModule,
    VehiculePersonnelRoutingModule,
    ReactiveFormsModule
  ],
  exports :[NewVehiculePersonnelComponent,
    ListVehiculePersonnelComponent,
    SingleVehiculePersonnelComponent,
    EditVehiculePersonnelComponent]

})
export class VehiculePersonnelModule { }
