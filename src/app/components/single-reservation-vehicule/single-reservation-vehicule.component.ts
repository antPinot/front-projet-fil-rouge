import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationVehiculeSociete } from 'src/app/models/reservationVehiculeSociete.model';
import { ReservationVehiculeService } from 'src/app/services/reservation-vehicule.service';

@Component({
  selector: 'app-single-reservation-vehicule',
  templateUrl: './single-reservation-vehicule.component.html',
  styleUrls: ['./single-reservation-vehicule.component.css']
})
export class SingleReservationVehiculeComponent{

  @Input()
  reservationVehicule!: ReservationVehiculeSociete

  constructor(private reservationVehiculeService: ReservationVehiculeService, private router:Router){}

  onEdit(){
    this.reservationVehiculeService.reservationVehiculeSocieteToEdit = this.reservationVehicule;
    this.router.navigateByUrl('vehicule-societe/reservation/edit')
  }

  onDelete(){
    this.reservationVehiculeService.annulerReservationVehiculeSociete(this.reservationVehicule.id).subscribe()
  }

}
