import { Component, Input } from '@angular/core';
import { ReservationVehiculeSociete } from 'src/app/models/reservationVehiculeSociete.model';

@Component({
  selector: 'app-single-reservation-vehicule',
  templateUrl: './single-reservation-vehicule.component.html',
  styleUrls: ['./single-reservation-vehicule.component.css']
})
export class SingleReservationVehiculeComponent {

  @Input()
  reservationVehicule!: ReservationVehiculeSociete

}
