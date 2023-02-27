import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { VehiculeSociete } from 'src/app/models/vehicule-societe';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationVehiculeService } from 'src/app/services/reservation-vehicule.service';

@Component({
  selector: 'app-edit-reservation-vehicule',
  templateUrl: './edit-reservation-vehicule.component.html',
  styleUrls: ['./edit-reservation-vehicule.component.css']
})
export class EditReservationVehiculeComponent implements OnInit, OnDestroy {

  collaborateurId?= this.authService.currentCollaborateur?.id;

  reservationVehiculeToEdit = this.reservationVehiculeService.reservationVehiculeSocieteToEdit;

  listVehiculeSociete$ = this.reservationVehiculeService.listVehicule$

  reservationVehiculeEditForm!: FormGroup

  currentVehiculeSociete = this.reservationVehiculeService.reservationVehiculeSocieteToEdit.vehiculeSociete;

  constructor(private reservationVehiculeService: ReservationVehiculeService, private formBuilder: FormBuilder, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.reservationVehiculeEditForm = this.formBuilder.group({
      dateDepart: [this.reservationVehiculeToEdit.dateDepart, Validators.required],
      dateRetour: [this.reservationVehiculeToEdit.dateRetour, Validators.required],
    })
    this.reservationVehiculeService.getAllVehiculeSociete().subscribe()
  }

  ngOnDestroy(): void {
    this.listVehiculeSociete$.next([]);
  }

  previous() {
    if (this.currentVehiculeSociete) {
      let index = this.listVehiculeSociete$.value.indexOf(this.currentVehiculeSociete)
      if (index == 0) {
        this.currentVehiculeSociete = this.listVehiculeSociete$.value[this.listVehiculeSociete$.value.length - 1]
      } else {
        this.currentVehiculeSociete = this.listVehiculeSociete$.value[index - 1]
      }
      console.log(this.currentVehiculeSociete);
    }
  }

  next() {
    if (this.currentVehiculeSociete) {
      let index = this.listVehiculeSociete$.value.indexOf(this.currentVehiculeSociete)
      if (index == this.listVehiculeSociete$.value.length - 1) {
        this.currentVehiculeSociete = this.listVehiculeSociete$.value[0]
      } else {
        this.currentVehiculeSociete = this.listVehiculeSociete$.value[index + 1]
      }
      console.log(this.currentVehiculeSociete);
    }
  }

  onSubmitForm() {
    this.reservationVehiculeToEdit.dateDepart = this.reservationVehiculeEditForm.value.dateDepart;
    this.reservationVehiculeToEdit.dateRetour = this.reservationVehiculeEditForm.value.dateRetour;
    this.reservationVehiculeToEdit.vehiculeSociete = this.currentVehiculeSociete;
    this.reservationVehiculeToEdit.collaborateurId = this.reservationVehiculeToEdit.collaborateur?.id;
    this.reservationVehiculeToEdit.vehiculeSocieteId = this.reservationVehiculeToEdit.vehiculeSociete?.id;
    this.reservationVehiculeService.updateReservationVehiculeSociete(this.reservationVehiculeToEdit).pipe(
      tap(() => this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(this.collaborateurId, 'en-cours')),
      tap(() => this.router.navigateByUrl('vehicule-societe/reservation/list'))
    ).subscribe();
  }

}
