import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { EditReservationVehiculeComponent } from './components/edit-reservation-vehicule/edit-reservation-vehicule.component';
import { EditVehiculePersonnelComponent } from './components/edit-vehicule-personnel/edit-vehicule-personnel.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EditVehiculeSocieteComponent } from './components/edit-vehicule-societe/edit-vehicule-societe.component';
import { ListReservationCovoiturageComponent } from './components/list-reservation-covoiturage/list-reservation-covoiturage.component';
import { ListReservationVehiculeSocieteComponent } from './components/list-reservation-vehicule-societe/list-reservation-vehicule-societe.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NewReservationVehiculeSocieteComponent } from './components/new-reservation-vehicule-societe/new-reservation-vehicule-societe.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchCovoiturageComponent } from './components/search-covoiturage/search-covoiturage.component';
import { AuthGuard } from './_helpers/guards/auth/auth.guard';
import { AdminGuard } from './_helpers/guards/admin/admin.guard';
import { NewReservationCovoiturageComponent } from './components/new-reservation-covoiturage/new-reservation-covoiturage.component';




const routes: Routes = [
  {path: 'vehicule-personnel/create', component: NewVehiculePersonnelComponent, canActivate: [AuthGuard]},
  {path: 'vehicule-personnel/list', component: ListVehiculePersonnelComponent, canActivate: [AuthGuard]},
  {path: 'vehicule-personnel/edit', component: EditVehiculePersonnelComponent, canActivate: [AuthGuard]},
  {path: 'covoiturage/create', component: CovoiturageComponent, canActivate: [AuthGuard]},
  {path: 'covoiturage/list-covoiturage', component: CovoiturageListComponent, canActivate: [AuthGuard]},
  {path: 'covoiturage/reservation/list', component: ListReservationCovoiturageComponent, canActivate: [AuthGuard]},
  {path: 'covoiturage/reservation/search', component: SearchCovoiturageComponent, canActivate: [AuthGuard]},
  {path: 'Login', component: LoginComponent},
  {path: 'Logout', component: LogoutComponent},
  {path: 'home', component: LandingPageComponent, canActivate: [AuthGuard]},


  {path: 'Register', component: RegisterComponent}, /**ajout register */

  {path: '', redirectTo: 'home', pathMatch: 'full'}, /**redirection */
  {path: 'vehicule-societe/create', component: NewVehiculeSocieteComponent, canActivate: [AdminGuard]},
  {path: 'vehicule-societe', component: ListVehiculeSocieteComponent, canActivate: [AdminGuard]},
  {path: 'vehicule-societe/edit', component: EditVehiculeSocieteComponent, canActivate: [AdminGuard]},
  {path: 'vehicule-societe/reservation/list', component: ListReservationVehiculeSocieteComponent, canActivate: [AuthGuard]},
  {path: 'vehicule-societe/reservation/create', component: NewReservationVehiculeSocieteComponent, canActivate: [AuthGuard]},
  {path: 'vehicule-societe/reservation/edit', component: EditReservationVehiculeComponent, canActivate: [AuthGuard]},

  {
    path: 'covoiturage/:id/edit', 
    component: CovoiturageDetailsComponent
  }, //faire loadchildrenRouting
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
