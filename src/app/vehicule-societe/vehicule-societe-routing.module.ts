import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin/admin.guard';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { EditVehiculeSocieteComponent } from './components/edit-vehicule-societe/edit-vehicule-societe.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';

const routes: Routes = [
{path: 'create', component: NewVehiculeSocieteComponent, /*canActivate: [AdminGuard]*/},
{path: 'list', component: ListVehiculeSocieteComponent, /*canActivate: [AdminGuard]*/},
{path: 'edit', component: EditVehiculeSocieteComponent, canActivate: [AdminGuard]},
{path: ':id/booking-list', component: BookingListComponent, /*canActivate: [AdminGuard]*/},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculeSocieteRoutingModule { }
