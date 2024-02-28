import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { CovoiturageAdresseComponent } from './components/covoiturage-adresse/covoiturage-adresse.component';
import { CovoiturageDetailedInfosComponent } from './components/covoiturage-detailed-infos/covoiturage-detailed-infos.component';
import { CovoiturageDetailsComponent } from './components/covoiturage-details/covoiturage-details.component';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CovoiturageRouteComponent } from './components/covoiturage-route/covoiturage-route.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { CovoiturageConfirmComponent } from './components/covoiturage-confirm/covoiturage-confirm.component';
import { CovoiturageEditComponent } from './components/covoiturage-edit/covoiturage-edit.component';

const routes: Routes = [
  // { path: 'create', component: CovoiturageComponent, canActivate: [AuthGuard] },
  {
    path: 'create',
    children: [
    {path: 'adresse-depart' , component: CovoiturageAdresseComponent, /* canActivate: [AuthGuard] */},
    {path: 'adresse-arrivee' , component: CovoiturageAdresseComponent,/* canActivate: [AuthGuard] */},
    {path: 'route' , component: CovoiturageRouteComponent, /*canActivate: [AuthGuard] */},
    {path: 'details' , component: CovoiturageDetailedInfosComponent, /*canActivate: [AuthGuard] */},
    {path: 'confirm' , component: CovoiturageConfirmComponent, /*canActivate: [AuthGuard] */},
    ]
  },
  { path: 'list-covoiturage', component: CovoiturageListComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: CovoiturageEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovoiturageRoutingModule { }
