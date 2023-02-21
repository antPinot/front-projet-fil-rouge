import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { SingleVehiculePersonnelComponent } from './components/single-vehicule-personnel/single-vehicule-personnel.component';

@NgModule({
  declarations: [
    AppComponent,
    NewVehiculePersonnelComponent,
    ListVehiculePersonnelComponent,
    SingleVehiculePersonnelComponent
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
