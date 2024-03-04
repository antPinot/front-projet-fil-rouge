import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { VehiculeSociete } from '../../../core/models/vehicule-societe';
import { VehiculeSocieteService } from '../../../core/services/vehicule-societe.service';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'app-single-vehicule-societe',
  templateUrl: './single-vehicule-societe.component.html',
  styleUrls: ['./single-vehicule-societe.component.css']
})
export class SingleVehiculeSocieteComponent {

  constructor(private _vehiculeSocieteService: VehiculeSocieteService, private router:Router) { }

  @Input()
  vehiculeSociete!: VehiculeSociete
  
  @Input()
  filteredList!: BehaviorSubject<VehiculeSociete[]>

  /**
   * Méthode de modification pour un véhicule de société au moment du click sur le bouton "Modifier"
   * du véhicule concerné
   */
  onEdit(){
    this._vehiculeSocieteService.findAllVehiculeSociete().pipe(tap(() => {
      this._vehiculeSocieteService.vehiculeSocieteToEdit = this.vehiculeSociete;
      this.router.navigateByUrl('vehicule-societe/create');
    })).subscribe()
  }

  /**
   * Méthode de suppression pour un véhicule de société au moment du click sur le bouton "Supprimer"
   * du véhicule concerné
   */
  onDelete(idVs?: number) {
    if (idVs) {
      this._vehiculeSocieteService.deleteOne(idVs).pipe(tap(() => this.filteredList.next(this._vehiculeSocieteService.vehiculesSociete$.value))).subscribe();
    }
  }

}
