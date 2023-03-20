import { Component, OnInit } from '@angular/core';
import { ReservationVehiculeService } from '../../../core/services/reservation-vehicule.service';

@Component({
  selector: 'app-list-reservation-admin',
  templateUrl: './list-reservation-admin.component.html',
  styleUrls: ['./list-reservation-admin.component.css']
})
export class ListReservationAdminComponent implements OnInit {

  /** List des réservations de véhicule de société */
  listReservationVehiculeAdmin$ = this.reservationVehiculeService.listReservationVehicule$;

  //isEmpty = this.listReservationVehicule$.value.length == 0;

  constructor(private reservationVehiculeService: ReservationVehiculeService) { }

  ngOnInit(): void {
    this.enCours();
  }

  enCours(): void {
    this.reservationVehiculeService.getReservationVehiculeSocieteByState('en-cours').subscribe();
    this.reservationVehiculeService.enCours = true;
  }

  historique(): void {
    this.reservationVehiculeService.getReservationVehiculeSocieteByState('historique').subscribe();
    this.reservationVehiculeService.enCours = false;
  }

}
