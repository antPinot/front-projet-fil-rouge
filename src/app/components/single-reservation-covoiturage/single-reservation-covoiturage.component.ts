import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Covoiturage } from 'src/app/models/covoiturage';
import { DetailReservationCovoiturageComponent } from '../detail-reservation-covoiturage/detail-reservation-covoiturage.component';

@Component({
  selector: 'app-single-reservation-covoiturage',
  templateUrl: './single-reservation-covoiturage.component.html',
  styleUrls: ['./single-reservation-covoiturage.component.css']
})
export class SingleReservationCovoiturageComponent implements OnInit{

  @Input()
  reservationCovoiturage!: Covoiturage

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.reservationCovoiturage)
  }

  displayDetails() {
    const detailWindow = this.dialog.open(DetailReservationCovoiturageComponent, {
      height: '400px', width: '600px', data:
      {
        dateDepart: this.reservationCovoiturage.dateDepart,
        adresseDepart: this.reservationCovoiturage.adresseDepart,
        adresseArrivee: this.reservationCovoiturage.adresseArrivee,
        placesRestantes: this.reservationCovoiturage.placesRestantes,
        nbPersonnes: this.reservationCovoiturage.nbPersonnes,
        dureeTrajet: this.reservationCovoiturage.dureeTrajet,
        distance: this.reservationCovoiturage.distance,
        organisateur : this.reservationCovoiturage.organisateurId,
        vehicule: this.reservationCovoiturage.vehiculePersonnelId,
      }
    },)
  }

}
