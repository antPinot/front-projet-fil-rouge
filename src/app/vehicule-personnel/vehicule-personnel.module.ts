import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculePersonnelRoutingModule } from './vehicule-personnel-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { SingleVehiculePersonnelComponent } from './components/single-vehicule-personnel/single-vehicule-personnel.component';
import { EditVehiculePersonnelComponent } from './components/edit-vehicule-personnel/edit-vehicule-personnel.component';
import { MaterialModule } from '../core/material-module/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteVehiculePersonnelComponent } from './components/delete-vehicule-personnel/delete-vehicule-personnel.component';


@NgModule({
  declarations: [NewVehiculePersonnelComponent,
    ListVehiculePersonnelComponent,
    SingleVehiculePersonnelComponent,
    EditVehiculePersonnelComponent,
    DeleteVehiculePersonnelComponent],

  imports: [
    CommonModule,
    VehiculePersonnelRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports :[NewVehiculePersonnelComponent,
    ListVehiculePersonnelComponent,
    SingleVehiculePersonnelComponent,
    EditVehiculePersonnelComponent]

})
export class VehiculePersonnelModule { }
