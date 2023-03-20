import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovoiturageRoutingModule } from './covoiturage-routing.module';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { SingleCovoiturageComponent } from './components/single-covoiturage/single-covoiturage.component';


@NgModule({
  declarations: [
    CovoiturageComponent,
    CovoiturageListComponent ,
    SingleCovoiturageComponent,
    CovoiturageDetailsComponent
  ],
  imports: [
    CommonModule,
    CovoiturageRoutingModule
  ],
  exports: [
    CovoiturageComponent,
    CovoiturageListComponent ,
    SingleCovoiturageComponent,
    CovoiturageDetailsComponent
  ]
})
export class CovoiturageModule { }
