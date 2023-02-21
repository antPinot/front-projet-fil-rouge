import { Component, OnInit } from '@angular/core';
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
    this.reservationCovoiturageService.getListReservationCovoiturageByCollaborateur(4,'en-cours').subscribe();
  }

  historique(): void {
    this.reservationCovoiturageService.getListReservationCovoiturageByCollaborateur(4,'historique').subscribe();
  }

}
