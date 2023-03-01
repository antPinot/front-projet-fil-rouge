import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Covoiturage } from 'src/app/models/covoiturage';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';
import { DetailReservationCovoiturageComponent } from '../detail-reservation-covoiturage/detail-reservation-covoiturage.component';

/**
 * Component gérant l'affiche d'une réservation individuelle de covoiturage 
 * 
 */
@Component({
  selector: 'app-single-reservation-covoiturage',
  templateUrl: './single-reservation-covoiturage.component.html',
  styleUrls: ['./single-reservation-covoiturage.component.css']
})
export class SingleReservationCovoiturageComponent implements OnInit {

  /** Réservation de covoiturage émise par l'observable du component parent (list-reservation-covoiturage) */
  @Input()
  reservationCovoiturage!: Covoiturage

  /** Id du collaborateur connecté */
  collaborateurId?= this.authService.currentCollaborateur?.id;

  /** Booléen récupéré du service qui permet de gérer l'affichage du bouton de suppression */
  enCours = this.reservationCovoiturageService.enCours;

  /** Booléen qui permet de gérer l'affichage du bouton de réservation */
  reservable!: boolean

  constructor(private dialog: MatDialog, private reservationCovoiturageService: ReservationCovoiturageService, private authService: AuthService) { }

  /** Rend impossible à réserver les covoiturages auxquels participe le collaborateur */
  ngOnInit(): void {
    if (this.reservationCovoiturage.collaborateurs?.find(c => c.id == this.collaborateurId)) {
      this.reservable = false;
    } else {
      this.reservable = true;
    }
  }

  /** Données envoyées au dialog detail-reservation-covoiturage pour l'affichage des détails et ouverture
   * de la fenêtre dialog
  */
  displayDetails() {
    this.dialog.open(DetailReservationCovoiturageComponent, {
      height: '400px', width: '700px', data:
      {
        id: this.reservationCovoiturage.id,
        dateDepart: this.reservationCovoiturage.dateDepart,
        adresseDepart: this.reservationCovoiturage.adresseDepart,
        adresseArrivee: this.reservationCovoiturage.adresseArrivee,
        placesRestantes: this.reservationCovoiturage.placesRestantes,
        nbPersonnes: this.reservationCovoiturage.nbPersonnes,
        dureeTrajet: this.reservationCovoiturage.dureeTrajet,
        distance: this.reservationCovoiturage.distance,
        organisateur: this.reservationCovoiturage.organisateur,
        vehiculePersonnel: this.reservationCovoiturage.vehiculePersonnel
      }
    },)
  }

}
