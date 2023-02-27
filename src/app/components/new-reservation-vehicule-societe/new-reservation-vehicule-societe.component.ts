import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ReservationVehiculeSociete } from 'src/app/models/reservationVehiculeSociete.model';
import { VehiculeSociete } from 'src/app/models/vehicule-societe';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationVehiculeService } from 'src/app/services/reservation-vehicule.service';

@Component({
  selector: 'app-new-reservation-vehicule-societe',
  templateUrl: './new-reservation-vehicule-societe.component.html',
  styleUrls: ['./new-reservation-vehicule-societe.component.css']
})
export class NewReservationVehiculeSocieteComponent implements OnInit, OnDestroy {

  collaborateurId?= this.authService.currentCollaborateur?.id;

  reservationVehiculeSocieteForm!: FormGroup

  listVehiculeSociete$ = this.reservationVehiculeService.listVehicule$

  currentVehiculeSociete!: VehiculeSociete

  emptyResult: boolean = true

  reservationVehiculeSociete: ReservationVehiculeSociete = {}

  constructor(private formBuilder: FormBuilder, private reservationVehiculeService: ReservationVehiculeService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.reservationVehiculeSocieteForm = this.formBuilder.group({
      dateDepart: [null, Validators.required],
      dateRetour: [null, Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.listVehiculeSociete$.next([]);
  }

  previous() {
    let index = this.listVehiculeSociete$.value.indexOf(this.currentVehiculeSociete)
    if (index == 0) {
      this.currentVehiculeSociete = this.listVehiculeSociete$.value[this.listVehiculeSociete$.value.length - 1]
    } else {
      this.currentVehiculeSociete = this.listVehiculeSociete$.value[index - 1]
    }
  }

  next() {
    let index = this.listVehiculeSociete$.value.indexOf(this.currentVehiculeSociete)
    if (index == this.listVehiculeSociete$.value.length - 1) {
      this.currentVehiculeSociete = this.listVehiculeSociete$.value[0]
    } else {
      this.currentVehiculeSociete = this.listVehiculeSociete$.value[index + 1]
    }
  }

  onSubmitForm() {
    if (this.collaborateurId) {
      this.reservationVehiculeSociete.dateDepart = this.reservationVehiculeSocieteForm.value.dateDepart;
      this.reservationVehiculeSociete.dateRetour = this.reservationVehiculeSocieteForm.value.dateRetour;
      this.reservationVehiculeSociete.collaborateurId = this.collaborateurId
      this.reservationVehiculeSociete.vehiculeSocieteId = this.currentVehiculeSociete.id;
      this.reservationVehiculeSociete.vehiculeSociete = this.currentVehiculeSociete;
    }
    this.reservationVehiculeService.reserverVehiculeSociete(this.reservationVehiculeSociete).pipe(
      tap(() => this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(this.collaborateurId, 'en-cours').subscribe()),
      tap(() => this.router.navigateByUrl('vehicule-societe/reservation/list'))
    ).subscribe();

  }

  onSearch() {
    this.reservationVehiculeService.getVehiculeSocieteDispoByDates(this.reservationVehiculeSocieteForm.value.dateDepart, this.reservationVehiculeSocieteForm.value.dateRetour).pipe(
      tap((vehiculesSociete) => {
        this.currentVehiculeSociete = vehiculesSociete[0]
        vehiculesSociete.length == 0 ? this.emptyResult = true : this.emptyResult = false
      })
    ).subscribe()
  }

}
