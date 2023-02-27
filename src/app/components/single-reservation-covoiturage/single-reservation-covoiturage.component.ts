import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Covoiturage } from 'src/app/models/covoiturage';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';
import { DetailReservationCovoiturageComponent } from '../detail-reservation-covoiturage/detail-reservation-covoiturage.component';

@Component({
  selector: 'app-single-reservation-covoiturage',
  templateUrl: './single-reservation-covoiturage.component.html',
  styleUrls: ['./single-reservation-covoiturage.component.css']
})
export class SingleReservationCovoiturageComponent implements OnInit {

  @Input()
  reservationCovoiturage!: Covoiturage

  collaborateurId?= this.authService.currentCollaborateur?.id;

  enCours = this.reservationCovoiturageService.enCours;

  reservable!: boolean

  constructor(private dialog: MatDialog, private reservationCovoiturageService: ReservationCovoiturageService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.reservationCovoiturage.collaborateurs?.find(c => c.id == this.collaborateurId)) {
      this.reservable = false;
    } else {
      this.reservable = true;
    }
  }

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

  onDelete() {
    if (this.collaborateurId) {
      this.reservationCovoiturageService.annulerReservationCovoiturage(this.collaborateurId, this.reservationCovoiturage).subscribe()
    }

  }

}
