import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Covoiturage } from 'src/app/models/covoiturage';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';
import { DetailReservationCovoiturageComponent } from '../detail-reservation-covoiturage/detail-reservation-covoiturage.component';

@Component({
  selector: 'app-single-reservation-covoiturage',
  templateUrl: './single-reservation-covoiturage.component.html',
  styleUrls: ['./single-reservation-covoiturage.component.css']
})
export class SingleReservationCovoiturageComponent implements OnInit{

  @Input()
  reservationCovoiturage!: Covoiturage

  enCours = this.reservationCovoiturageService.enCours;

  reservable!: boolean

  constructor(private dialog: MatDialog, private reservationCovoiturageService: ReservationCovoiturageService) { }

  ngOnInit(): void {
    if (this.reservationCovoiturage.collaborateurs?.find(c => c.id == 2)){
      this.reservable = false;
    } else {
      this.reservable = true;
    }
  }

  displayDetails() {
    const detailWindow = this.dialog.open(DetailReservationCovoiturageComponent, {
      height: '400px', width: '700px', data:
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

  onDelete(){
    this.reservationCovoiturageService.annulerReservationCovoiturage(2, this.reservationCovoiturage).subscribe()
  }

}
