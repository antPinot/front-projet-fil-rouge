import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
