import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { tap } from 'rxjs';
import { ReservationVehiculeSociete } from 'src/app/models/reservationVehiculeSociete.model';
import { VehiculeSociete } from 'src/app/models/vehicule-societe';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationVehiculeService } from 'src/app/services/reservation-vehicule.service';

const coherentDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dateDepart = control.get('dateDepart')?.value;
  const dateRetour = control.get('dateRetour')?.value;
  if (dateDepart !== null && dateRetour !== null && moment(dateDepart).isBefore(dateRetour)) {
    return null
  } else {
    return { 'minDate': true }
  }
}

@Component({
  selector: 'app-new-reservation-vehicule-societe',
  templateUrl: './new-reservation-vehicule-societe.component.html',
  styleUrls: ['./new-reservation-vehicule-societe.component.css']
})
export class NewReservationVehiculeSocieteComponent implements OnInit, OnDestroy {
  
  currentDate = new Date();

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
    },
    {validators: [coherentDateValidator]})
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
      let formattedDateDepart = moment(this.reservationVehiculeSocieteForm.value.dateDepart).format("DD/MM/YYYY HH:mm")
      let formattedDateRetour = moment(this.reservationVehiculeSocieteForm.value.dateRetour).format("DD/MM/YYYY HH:mm")
      this.reservationVehiculeSociete.dateDepart = formattedDateDepart;
      this.reservationVehiculeSociete.dateRetour = formattedDateRetour;
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
    let formattedDateDepart = moment(this.reservationVehiculeSocieteForm.value.dateDepart).format("DD/MM/YYYY HH:mm")
    let formattedDateRetour = moment(this.reservationVehiculeSocieteForm.value.dateRetour).format("DD/MM/YYYY HH:mm")
    console.log(this.reservationVehiculeSocieteForm.value.dateDepart, this.reservationVehiculeSocieteForm.value.dateRetour)
    console.log(formattedDateDepart, formattedDateRetour)
    this.reservationVehiculeService.getVehiculeSocieteDispoByDates(formattedDateDepart, formattedDateRetour).pipe(
      tap((vehiculesSociete) => {
        this.currentVehiculeSociete = vehiculesSociete[0]
        vehiculesSociete.length == 0 ? this.emptyResult = true : this.emptyResult = false
      })
    ).subscribe()
  }

}
