import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { ListReservationCovoiturageComponent } from './components/list-reservation-covoiturage/list-reservation-covoiturage.component';
import { ListVehiculePersonnelComponent } from './components/list-vehicule-personnel/list-vehicule-personnel.component';
import { ListVehiculeSocieteComponent } from './components/list-vehicule-societe/list-vehicule-societe.component';
import { NewVehiculePersonnelComponent } from './components/new-vehicule-personnel/new-vehicule-personnel.component';
import { NewVehiculeSocieteComponent } from './components/new-vehicule-societe/new-vehicule-societe.component';
import { SearchCovoiturageComponent } from './components/search-covoiturage/search-covoiturage.component';
import { VehiculeServiceComponent } from './components/vehicule-service/vehicule-service.component';

const routes: Routes = [
  {path: 'vehicule-personnel/create', component: NewVehiculePersonnelComponent},
  {path: 'vehicule-personnel/list', component: ListVehiculePersonnelComponent},
  {path: 'vehicule-service/create', component: VehiculeServiceComponent},
  {path: 'covoiturage/create', component: CovoiturageComponent},
  {path: 'covoiturage/list-covoiturage', component: CovoiturageListComponent},
  {path: 'covoiturage/reservation/list', component: ListReservationCovoiturageComponent},
  {path: 'covoiturage/reservation/search', component: SearchCovoiturageComponent},

  {
    path: 'covoiturage/:id/edit', 
    component: CovoiturageDetailsComponent
  } //faire loadchildrenRouting
,
  {path: 'vehicule-societe/create', component: NewVehiculeSocieteComponent},
  {path: 'vehicule-societe', component: ListVehiculeSocieteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
