import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationVehiculeService } from 'src/app/services/reservation-vehicule.service';

const states =  {
  enCours : 'en-cours',
  historique : 'historique'
}

@Component({
  selector: 'app-list-reservation-vehicule-societe',
  templateUrl: './list-reservation-vehicule-societe.component.html',
  styleUrls: ['./list-reservation-vehicule-societe.component.css']
})
export class ListReservationVehiculeSocieteComponent {

  listReservationVehicule$ = this.reservationVehiculeService.listReservationVehicule$;

  constructor(private reservationVehiculeService: ReservationVehiculeService, router:Router){}

  enCours(): void {
    this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(1,states.enCours).subscribe();
  }

  historique(): void {
    this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(1,states.historique).subscribe();
  }

}
