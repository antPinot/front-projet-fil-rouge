import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';

const routes: Routes = [
  { path: 'create', component: CovoiturageComponent, canActivate: [AuthGuard] },
  { path: 'list-covoiturage', component: CovoiturageListComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: CovoiturageDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovoiturageRoutingModule { }
