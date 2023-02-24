import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { ListReservationCovoiturageComponent } from './components/list-reservation-covoiturage/list-reservation-covoiturage.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { SearchCovoiturageComponent } from './components/search-covoiturage/search-covoiturage.component';
import { VehiculeServiceComponent } from './components/vehicule-service/vehicule-service.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';



const routes: Routes = [
  {path: 'vehicule-personnel/create', component: NewVehiculePersonnelComponent},
  {path: 'vehicule-personnel/list', component: ListVehiculePersonnelComponent},
  {path: 'vehicule-service/create', component: VehiculeServiceComponent},
  {path: 'covoiturage/create', component: CovoiturageComponent},
  {path: 'covoiturage/list-covoiturage', component: CovoiturageListComponent},
  {path: 'covoiturage/reservation/list', component: ListReservationCovoiturageComponent},
  {path: 'covoiturage/reservation/search', component: SearchCovoiturageComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Logout', component: LogoutComponent},

  {path: '', redirectTo: 'Login'}, /**redirection */

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
