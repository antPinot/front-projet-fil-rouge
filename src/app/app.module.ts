import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { DetailReservationCovoiturageComponent } from './components/detail-reservation-covoiturage/detail-reservation-covoiturage.component';
import { DetailVehiculeSocieteComponent } from './components/detail-vehicule-societe/detail-vehicule-societe.component';
import { ListReservationCovoiturageComponent } from './components/list-reservation-covoiturage/list-reservation-covoiturage.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { NewReservationCovoiturageComponent } from './components/new-reservation-covoiturage/new-reservation-covoiturage.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';
import { SearchCovoiturageComponent } from './components/search-covoiturage/search-covoiturage.component';
import { SingleReservationCovoiturageComponent } from './components/single-reservation-covoiturage/single-reservation-covoiturage.component';
import { SingleVehiculePersonnelComponent } from './components/single-vehicule-personnel/single-vehicule-personnel.component';
import { SingleVehiculeSocieteComponent } from './components/single-vehicule-societe/single-vehicule-societe.component';
import { MaterialModule } from './material-module/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { EditReservationVehiculeComponent } from './components/edit-reservation-vehicule/edit-reservation-vehicule.component';
import { EditVehiculePersonnelComponent } from './components/edit-vehicule-personnel/edit-vehicule-personnel.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListReservationVehiculeSocieteComponent } from './components/list-reservation-vehicule-societe/list-reservation-vehicule-societe.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NewReservationVehiculeSocieteComponent } from './components/new-reservation-vehicule-societe/new-reservation-vehicule-societe.component';
import { SingleCovoiturageComponent } from './components/single-covoiturage/single-covoiturage.component';
import { SingleReservationVehiculeComponent } from './components/single-reservation-vehicule/single-reservation-vehicule.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { EditVehiculeSocieteComponent } from './components/edit-vehicule-societe/edit-vehicule-societe.component';
import { RegisterComponent } from './components/register/register.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    NewReservationCovoiturageComponent,
    SingleReservationCovoiturageComponent,
    ListReservationCovoiturageComponent,
    DetailReservationCovoiturageComponent,
    SearchCovoiturageComponent,
    CovoiturageListComponent ,
    SingleCovoiturageComponent,
    CovoiturageDetailsComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    EditVehiculePersonnelComponent,
    ListReservationVehiculeSocieteComponent,
    SingleReservationVehiculeComponent,
    NewReservationVehiculeSocieteComponent,
    EditReservationVehiculeComponent,
    LandingPageComponent,
    EditVehiculeSocieteComponent,
    RegisterComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
