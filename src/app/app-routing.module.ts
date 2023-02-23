import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';

const routes: Routes = [
  {path: 'vehicule-personnel/create', component: NewVehiculePersonnelComponent},
  {path: 'vehicule-personnel/list', component: ListVehiculePersonnelComponent},
  {path: 'vehicule-societe/create', component: NewVehiculeSocieteComponent},
  {path: 'vehicule-societe', component: ListVehiculeSocieteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
