import { Component, Input } from '@angular/core';
import { ReservationVehiculeSociete } from 'src/app/models/reservationVehiculeSociete.model';
import { ReservationVehiculeService } from 'src/app/services/reservation-vehicule.service';

@Component({
  selector: 'app-single-reservation-vehicule',
  templateUrl: './single-reservation-vehicule.component.html',
  styleUrls: ['./single-reservation-vehicule.component.css']
})
export class SingleReservationVehiculeComponent {

  @Input()
  reservationVehicule!: ReservationVehiculeSociete

  constructor(private reservationVehiculeService: ReservationVehiculeService){}

  onUpdate(){

  }

  onDelete(){
    this.reservationVehiculeService.annulerReservationVehiculeSociete(this.reservationVehicule.id).subscribe()
  }
  
}
