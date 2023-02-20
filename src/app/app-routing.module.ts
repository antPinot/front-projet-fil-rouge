import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';

const routes: Routes = [
  {path: 'vehicule-personnel/create', component: NewVehiculePersonnelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
