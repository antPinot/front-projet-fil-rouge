import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationVehiculeSociete } from '../../../core/models/reservationVehiculeSociete.model';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationVehiculeService } from '../../../core/services/reservation-vehicule.service';

@Component({
  selector: 'app-detail-vehicule-societe',
  templateUrl: './detail-vehicule-societe.component.html',
  styleUrls: ['./detail-vehicule-societe.component.css']
})
export class DetailVehiculeSocieteComponent{

  reservationVehiculeSociete!: ReservationVehiculeSociete

  constructor(public dialogRef: MatDialogRef<DetailVehiculeSocieteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationVehiculeSociete, private reservationVehiculeService: ReservationVehiculeService, private router: Router,
    private authService: AuthService) {
    this.reservationVehiculeSociete = { ...data }
  }

  onDelete(){
    this.reservationVehiculeService.annulerReservationVehiculeSociete(this.reservationVehiculeSociete.id).subscribe()
  }

}
