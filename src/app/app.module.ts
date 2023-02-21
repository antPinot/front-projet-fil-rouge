 

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CovoiturageService } from './services/covoiturage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
 
@NgModule({
  declarations: [
    AppComponent,
    CovoiturageComponent
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
