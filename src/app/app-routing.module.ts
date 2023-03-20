import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoiturageDetailsComponent } from '../app/covoiturage/components/covoiturage-details/covoiturage-details.component';


const routes: Routes = [
  { path: 'covoiturage/:id/edit', component: CovoiturageDetailsComponent }, //faire loadchildrenRouting
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
