import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { EditVehiculePersonnelComponent } from './components/edit-vehicule-personnel/edit-vehicule-personnel.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';

const routes: Routes = [
  {path: 'vehicule-personnel/create', component: NewVehiculePersonnelComponent, canActivate: [AuthGuard]},
  {path: 'vehicule-personnel/list', component: ListVehiculePersonnelComponent, canActivate: [AuthGuard]},
  {path: 'vehicule-personnel/edit', component: EditVehiculePersonnelComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculePersonnelRoutingModule { }
