import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationCovoiturageService } from '../../../core/services/reservation-covoiturage.service';

/**
 * 
 * Component qui gère l'affichage de la liste des réservations de covoiturage
 * (participation) d'un collaborateur connecté
 * 
 */
@Component({
  selector: 'app-list-reservation-covoiturage',
  templateUrl: './list-reservation-covoiturage.component.html',
  styleUrls: ['./list-reservation-covoiturage.component.css']
})
export class ListReservationCovoiturageComponent implements OnInit {

  /** Id du collaborateur connecté */
  collaborateurId?= this.authService.currentCollaborateur?.id;

  /** Liste des réservations de covoiturage en fonction du statut (en cours ou historique) */
  listReservationCovoiturage$ = this.reservationCovoiturageService.listReservationCovoiturage$;

  //isEmpty = this.listReservationCovoiturage$.value.length == 0;

  constructor(private reservationCovoiturageService: ReservationCovoiturageService, private authService: AuthService) { }

  /** Intialisation du component avec les réservations de covoiturage en cours */
  ngOnInit(): void {
    this.enCours();
  }

  /** Liste des réservations de covoiturage en cours 
   * 
   * Un booléen enCours permet de conditionner l'affichage du bouton de suppresion d'un réservation (Cf. detail-reservation-covoiturage)
   * 
  */
  enCours(): void {
    if (this.collaborateurId) {

      console.log(this.collaborateurId)
      this.reservationCovoiturageService.getListReservationCovoiturageByCollaborateur(this.collaborateurId, 'en-cours').subscribe();
      this.reservationCovoiturageService.enCours = true;
    }

  }

  /** Liste des réservations de covoiturage passées (historique) 
   * 
   * Un booléen enCours permet de conditionner l'affichage du bouton de suppresion d'un réservation (Cf. detail-reservation-covoiturage)
   * 
  */
  historique(): void {
    if (this.collaborateurId) {
      this.reservationCovoiturageService.getListReservationCovoiturageByCollaborateur(this.collaborateurId, 'historique').subscribe();
      this.reservationCovoiturageService.enCours = false;
    }


  }

}
