import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculeSocieteRoutingModule } from './vehicule-societe-routing.module';
import { DetailVehiculeSocieteComponent } from './components/detail-vehicule-societe/detail-vehicule-societe.component';
import { EditVehiculeSocieteComponent } from './components/edit-vehicule-societe/edit-vehicule-societe.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';
import { SingleVehiculeSocieteComponent } from './components/single-vehicule-societe/single-vehicule-societe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material-module/material.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    NewVehiculeSocieteComponent,
    ListVehiculeSocieteComponent,
    SingleVehiculeSocieteComponent,
    DetailVehiculeSocieteComponent,
    EditVehiculeSocieteComponent,
    BookingListComponent
  ],
  imports: [
    CommonModule,
    VehiculeSocieteRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatTableModule
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
