import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VehiculePersonnel } from '../../../core/models/vehicule-personnel';
import { VehiculePersonnelService } from '../../../core/services/vehicule-personnel.service';
import { DeleteVehiculePersonnelComponent } from '../delete-vehicule-personnel/delete-vehicule-personnel.component';

/**
 * Component permettant l'affichage d'un véhicule personnel
 * individuel
 *
 */
@Component({
  selector: 'app-single-vehicule-personnel',
  templateUrl: './single-vehicule-personnel.component.html',
  styleUrls: ['./single-vehicule-personnel.component.css'],
})
export class SingleVehiculePersonnelComponent {
  constructor(
    private vehiculePersonnelService: VehiculePersonnelService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @Input()
  vehiculePersonnel!: VehiculePersonnel;

  /**
   * Méthode de suppression d'un véhicule
   * déclenchée lors de l'évènement click sur le bouton de suppression
   *
   * @param vehiculePersonnelId Id du véhicule à supprimer
   */
  onDelete(vehiculePersonnelId?: number) {
    if (
      vehiculePersonnelId &&
      this.vehiculePersonnelService.checkVehiculePersonnelInCovoiturage()
    ) {
      this.vehiculePersonnelService
        .deleteVehiculePersonnel(vehiculePersonnelId)
        .subscribe();
    } else {
      this.dialog.open(DeleteVehiculePersonnelComponent, {
        height: '400px',
        width: '700px',
        data : this.vehiculePersonnel
      });
    }
  }

  onEdit() {
    this.vehiculePersonnelService.vehiculePersonnelToEdit =
      this.vehiculePersonnel;
    this.router.navigateByUrl('vehicule-personnel/create');
  }
}
