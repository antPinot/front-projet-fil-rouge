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
import { CovoiturageAdresseComponent } from './components/covoiturage-adresse/covoiturage-adresse.component';
import { CovoiturageRouteComponent } from './components/covoiturage-route/covoiturage-route.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CovoiturageDetailedInfosComponent } from './components/covoiturage-detailed-infos/covoiturage-detailed-infos.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CovoiturageComponent,
    CovoiturageListComponent ,
    SingleCovoiturageComponent,
    CovoiturageDetailsComponent,
    CovoiturageAdresseComponent,
    CovoiturageRouteComponent,
    CovoiturageDetailedInfosComponent,
  ],
  imports: [
    CommonModule,
    CovoiturageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ReservationCovoiturageModule,
    LeafletModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    CovoiturageComponent,
    CovoiturageListComponent ,
    SingleCovoiturageComponent,
    CovoiturageDetailsComponent,
    CovoiturageAdresseComponent
  ]
})
export class CovoiturageModule { }
