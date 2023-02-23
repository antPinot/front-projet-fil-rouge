 

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { CovoiturageService } from './services/covoiturage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { SingleVehiculePersonnelComponent } from './components/single-vehicule-personnel/single-vehicule-personnel.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { SingleVehiculeSocieteComponent } from './components/single-vehicule-societe/single-vehicule-societe.component';
import { DetailVehiculeSocieteComponent } from './components/detail-vehicule-societe/detail-vehicule-societe.component';
 
@NgModule({
  declarations: [
    AppComponent,
    CovoiturageComponent,
    NewVehiculeSocieteComponent,
    NewVehiculePersonnelComponent,
    ListVehiculePersonnelComponent,
    SingleVehiculePersonnelComponent,
    ListVehiculeSocieteComponent,
    SingleVehiculeSocieteComponent,
    DetailVehiculeSocieteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
