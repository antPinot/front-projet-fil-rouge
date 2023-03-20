import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';

const routes: Routes = [
  { path: 'covoiturage/create', component: CovoiturageComponent, canActivate: [AuthGuard] },
  { path: 'covoiturage/list-covoiturage', component: CovoiturageListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovoiturageRoutingModule { }
