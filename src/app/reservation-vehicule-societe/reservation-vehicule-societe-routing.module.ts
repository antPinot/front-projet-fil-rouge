import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { EditReservationVehiculeComponent } from './components/edit-reservation-vehicule/edit-reservation-vehicule.component';
import { ListReservationVehiculeSocieteComponent } from './components/list-reservation-vehicule-societe/list-reservation-vehicule-societe.component';
import { NewReservationVehiculeSocieteComponent } from './components/new-reservation-vehicule-societe/new-reservation-vehicule-societe.component';

const routes: Routes = [
  {path: 'list', component: ListReservationVehiculeSocieteComponent, canActivate: [AuthGuard]},
  {path: 'create', component: NewReservationVehiculeSocieteComponent, canActivate: [AuthGuard]},
  {path: 'edit', component: EditReservationVehiculeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationVehiculeSocieteRoutingModule { }
