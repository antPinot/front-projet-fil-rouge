import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculeSociete } from '../../../core/models/vehicule-societe';
import { VehiculeSocieteService } from '../../../core/services/vehicule-societe.service';

@Component({
  selector: 'app-single-vehicule-societe',
  templateUrl: './single-vehicule-societe.component.html',
  styleUrls: ['./single-vehicule-societe.component.css']
})
export class SingleVehiculeSocieteComponent {

  constructor(private _vehiculeSocieteService: VehiculeSocieteService, private router:Router) { }

  @Input()
  vehiculeSociete!: VehiculeSociete

  /**
   * Méthode de modification pour un véhicule de société au moment du click sur le bouton "Modifier"
   * du véhicule concerné
   */
  onEdit(){
    this._vehiculeSocieteService.vehiculeSocieteToEdit = this.vehiculeSociete;
    this.router.navigateByUrl('vehicule-societe/edit');
  }

  /**
   * Méthode de suppression pour un véhicule de société au moment du click sur le bouton "Supprimer"
   * du véhicule concerné
   */
  onDelete(idVs?: number) {
    if (idVs) {
      this._vehiculeSocieteService.deleteOne(idVs).subscribe();
    }
  }

}
