import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/components/not-found/not-found.component';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/auth/auth-routing.module').then(m => m.AuthRoutingModule)},
  { path: 'covoiturage', loadChildren : () => import('./covoiturage/covoiturage-routing.module').then(m => m.CovoiturageRoutingModule) },
  { path: 'covoiturage/reservation', loadChildren : () => import('./reservation-covoiturage/reservation-covoiturage-routing.module').then(m => m.ReservationCovoiturageRoutingModule)},
  { path: 'vehicule-societe/reservation', loadChildren : () => import('./reservation-vehicule-societe/reservation-vehicule-societe-routing.module').then(m => m.ReservationVehiculeSocieteRoutingModule)},
  { path: 'vehicule-personnel', loadChildren : () => import('./vehicule-personnel/vehicule-personnel-routing.module').then(m => m.VehiculePersonnelRoutingModule)},
  { path: 'vehicule-societe', loadChildren : () => import('./vehicule-societe/vehicule-societe-routing.module').then(m => m.VehiculeSocieteRoutingModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)},
  { path: 'home', component: LandingPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },//page 404 lors mauvais routing

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
