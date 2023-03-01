import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationVehiculeSociete } from 'src/app/models/reservationVehiculeSociete.model';
import { ReservationVehiculeService } from 'src/app/services/reservation-vehicule.service';

/**
 * Component gérant l'affichage d'une réservation individuelle d'un véhicule
 * de société
 * 
 */
@Component({
  selector: 'app-single-reservation-vehicule',
  templateUrl: './single-reservation-vehicule.component.html',
  styleUrls: ['./single-reservation-vehicule.component.css']
})
export class SingleReservationVehiculeComponent{

   /** Réservation de véhicule de société émise par l'observable du component parent (list-reservation-vehicule-societe) */
  @Input()
  reservationVehicule!: ReservationVehiculeSociete

  enCours = this.reservationVehiculeService.enCours

  constructor(private reservationVehiculeService: ReservationVehiculeService, private router:Router){}

  /** Affecte le véhicule à modifier dans le service correspondant et redirige vers le formulaire de modification*/
  onEdit(){
    this.reservationVehiculeService.reservationVehiculeSocieteToEdit = this.reservationVehicule;
    this.router.navigateByUrl('vehicule-societe/reservation/edit')
  }

  /** Annule une réservation de véhicule de société */
  onDelete(){
    this.reservationVehiculeService.annulerReservationVehiculeSociete(this.reservationVehicule.id).subscribe()
  }

}
