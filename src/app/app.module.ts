import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/material-module/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { VehiculePersonnelModule } from './vehicule-personnel/vehicule-personnel.module';
import { VehiculeSocieteModule } from './vehicule-societe/vehicule-societe.module';
import { ReservationCovoiturageModule } from './reservation-covoiturage/reservation-covoiturage.module';
import { ReservationVehiculeSocieteModule } from './reservation-vehicule-societe/reservation-vehicule-societe.module';
import { CovoiturageModule } from './covoiturage/covoiturage.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './core/auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { NotFoundModule } from './not-found/not-found.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    LandingPageModule,
    NotFoundModule,
    CoreModule,
    AdminModule,
    LeafletModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
