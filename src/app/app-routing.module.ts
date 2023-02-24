import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { EditReservationVehiculeComponent } from './components/edit-reservation-vehicule/edit-reservation-vehicule.component';
import { EditVehiculePersonnelComponent } from './components/edit-vehicule-personnel/edit-vehicule-personnel.component';
import { ListReservationCovoiturageComponent } from './components/list-reservation-covoiturage/list-reservation-covoiturage.component';
import { ListReservationVehiculeSocieteComponent } from './components/list-reservation-vehicule-societe/list-reservation-vehicule-societe.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NewReservationVehiculeSocieteComponent } from './components/new-reservation-vehicule-societe/new-reservation-vehicule-societe.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';
import { SearchCovoiturageComponent } from './components/search-covoiturage/search-covoiturage.component';



const routes: Routes = [
  {path: 'vehicule-personnel/create', component: NewVehiculePersonnelComponent},
  {path: 'vehicule-personnel/list', component: ListVehiculePersonnelComponent},
  {path: 'vehicule-personnel/edit', component: EditVehiculePersonnelComponent},
  {path: 'covoiturage/create', component: CovoiturageComponent},
  {path: 'covoiturage/list-covoiturage', component: CovoiturageListComponent},
  {path: 'covoiturage/reservation/list', component: ListReservationCovoiturageComponent},
  {path: 'covoiturage/reservation/search', component: SearchCovoiturageComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Logout', component: LogoutComponent},

  {path: '', redirectTo: 'Login', pathMatch: 'full'}, /**redirection */
  {path: 'vehicule-societe/create', component: NewVehiculeSocieteComponent},
  {path: 'vehicule-societe', component: ListVehiculeSocieteComponent},
  {path: 'vehicule-societe/reservation/list', component: ListReservationVehiculeSocieteComponent},
  {path: 'vehicule-societe/reservation/create', component: NewReservationVehiculeSocieteComponent},
  {path: 'vehicule-societe/reservation/edit', component: EditReservationVehiculeComponent},

  {
    path: 'covoiturage/:id/edit', 
    component: CovoiturageDetailsComponent
  } //faire loadchildrenRouting
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
