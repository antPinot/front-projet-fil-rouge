import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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

  collaborateurId?= this.authService.currentCollaborateur?.id;

  listReservationVehicule$ = this.reservationVehiculeService.listReservationVehicule$;

  constructor(private reservationVehiculeService: ReservationVehiculeService, private authService: AuthService){}

  enCours(): void {
    this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(this.collaborateurId,states.enCours).subscribe();
  }

  historique(): void {
    this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(this.collaborateurId,states.historique).subscribe();
  }

}
