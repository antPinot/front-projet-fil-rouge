import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { ListReservationCovoiturageComponent } from './components/list-reservation-covoiturage/list-reservation-covoiturage.component';
import { SearchCovoiturageComponent } from './components/search-covoiturage/search-covoiturage.component';

const routes: Routes = [
  {path: 'covoiturage/reservation/list', component: ListReservationCovoiturageComponent, canActivate: [AuthGuard]},
  {path: 'covoiturage/reservation/search', component: SearchCovoiturageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationCovoiturageRoutingModule { }
