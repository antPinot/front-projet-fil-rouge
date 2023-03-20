import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationVehiculeService } from '../../../core/services/reservation-vehicule.service';

/** Paramètres de requête GET */
const states = {
  enCours: 'en-cours',
  historique: 'historique'
}

/**
 * Component affichant la liste des réservations des véhicules de société
 * d'un collaborateur connecté
 */
@Component({
  selector: 'app-list-reservation-vehicule-societe',
  templateUrl: './list-reservation-vehicule-societe.component.html',
  styleUrls: ['./list-reservation-vehicule-societe.component.css']
})
export class ListReservationVehiculeSocieteComponent implements OnInit {

  /** Id du collaborateur connecté */
  collaborateurId?= this.authService.currentCollaborateur?.id;

  /** List des réservations de véhicule de société */
  listReservationVehicule$ = this.reservationVehiculeService.listReservationVehicule$;

  //isEmpty = this.listReservationVehicule$.value.length == 0;

  constructor(private reservationVehiculeService: ReservationVehiculeService, private authService: AuthService) { }

  /** Intialisation du component avec les réservations de véhicule de société en cours */
  ngOnInit(): void {
    this.enCours();
  }

  /** Liste des réservations de véhicules de société en cours */
  enCours(): void {
    this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(this.collaborateurId, states.enCours).subscribe();
    this.reservationVehiculeService.enCours = true;
  }

  /** Liste des réservations de véhicule de société passées (historique) */
  historique(): void {
    this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(this.collaborateurId, states.historique).subscribe();
    this.reservationVehiculeService.enCours = false;
  }

}
