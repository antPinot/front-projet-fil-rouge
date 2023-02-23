import { Component } from '@angular/core';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';

@Component({
  selector: 'app-list-reservation-covoiturage',
  templateUrl: './list-reservation-covoiturage.component.html',
  styleUrls: ['./list-reservation-covoiturage.component.css']
})
export class ListReservationCovoiturageComponent{

  listReservationCovoiturage$ = this.reservationCovoiturageService.listReservationCovoiturage$;

  constructor(private reservationCovoiturageService: ReservationCovoiturageService){}

  enCours(): void {
    this.reservationCovoiturageService.getListReservationCovoiturageByCollaborateur(2,'en-cours').subscribe();
    // Comportement à effacer dès que les bons contrôles de dates seront implémentés
    this.reservationCovoiturageService.enCours = true;
  }

  historique(): void {
    this.reservationCovoiturageService.getListReservationCovoiturageByCollaborateur(2,'historique').subscribe();
    // Comportement à effacer dès que les bons contrôles de dates seront implémentés
    this.reservationCovoiturageService.enCours = false;

  }

}
