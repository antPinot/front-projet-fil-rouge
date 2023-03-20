import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin/admin.guard';
import { ListReservationAdminComponent } from './components/list-reservation-admin/list-reservation-admin.component';

const routes: Routes = [
  { path: 'vehicule-societe/reservation/state', component: ListReservationAdminComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
