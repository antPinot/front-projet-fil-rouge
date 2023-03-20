import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationVehiculeSociete } from '../../../core/models/reservationVehiculeSociete.model';
import { ReservationVehiculeService } from '../../../core/services/reservation-vehicule.service';
import { DetailVehiculeSocieteComponent } from '../../../vehicule-societe/components/detail-vehicule-societe/detail-vehicule-societe.component';

/**
 * Component gérant l'affichage d'une réservation individuelle d'un véhicule
 * de société
 * 
 */
@Component({
  selector: 'app-single-reservation-vehicule',
  templateUrl: './single-reservation-vehicule.component.html',
  styleUrls: ['./single-reservation-vehicule.component.css']
})
export class SingleReservationVehiculeComponent {

  /** Réservation de véhicule de société émise par l'observable du component parent (list-reservation-vehicule-societe) */
  @Input()
  reservationVehicule!: ReservationVehiculeSociete

  enCours = this.reservationVehiculeService.enCours

  constructor(private reservationVehiculeService: ReservationVehiculeService, private router: Router, private dialog: MatDialog) { }

  /** Affecte le véhicule à modifier dans le service correspondant et redirige vers le formulaire de modification*/
  onEdit() {
    this.reservationVehiculeService.reservationVehiculeSocieteToEdit = this.reservationVehicule;
    this.router.navigateByUrl('vehicule-societe/reservation/edit')
  }

  /** Annule une réservation de véhicule de société */
  onDelete() {
    this.dialog.open(DetailVehiculeSocieteComponent, {
      height: '400px', width: '700px', data:
      {
        id: this.reservationVehicule.id,
        dateDepart: this.reservationVehicule.dateDepart,
        dateRetour: this.reservationVehicule.dateRetour,
        vehiculeSociete: this.reservationVehicule.vehiculeSociete
      }
    })
  }

}
