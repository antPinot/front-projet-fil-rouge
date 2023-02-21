 

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { SingleVehiculePersonnelComponent } from './components/single-vehicule-personnel/single-vehicule-personnel.component';
import { VehiculeServiceComponent } from './components/vehicule-service/vehicule-service.component';
import { CovoiturageService } from './services/covoiturage.service';
import { NewReservationCovoiturageComponent } from './components/new-reservation-covoiturage/new-reservation-covoiturage.component';
import { SingleReservationCovoiturageComponent } from './components/single-reservation-covoiturage/single-reservation-covoiturage.component';
import { ListReservationCovoiturageComponent } from './components/list-reservation-covoiturage/list-reservation-covoiturage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './material-module/material.module';

 
@NgModule({
  declarations: [
    AppComponent,
    CovoiturageComponent,
    NewVehiculePersonnelComponent,
    ListVehiculePersonnelComponent,
    SingleVehiculePersonnelComponent,
    VehiculeServiceComponent,
    NewReservationCovoiturageComponent,
    SingleReservationCovoiturageComponent,
    ListReservationCovoiturageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModuleModule
  ],
  providers: [CovoiturageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
