import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin/admin.guard';
import { EditVehiculeSocieteComponent } from './components/edit-vehicule-societe/edit-vehicule-societe.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';

const routes: Routes = [
  {path: 'vehicule-societe/create', component: NewVehiculeSocieteComponent, canActivate: [AdminGuard]},
  {path: 'vehicule-societe', component: ListVehiculeSocieteComponent, canActivate: [AdminGuard]},
  {path: 'vehicule-societe/edit', component: EditVehiculeSocieteComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculeSocieteRoutingModule { }
