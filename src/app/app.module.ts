 

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { CovoiturageService } from './services/covoiturage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
 
@NgModule({
  declarations: [
    AppComponent,
    CovoiturageComponent,
    NewVehiculePersonnelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CovoiturageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
