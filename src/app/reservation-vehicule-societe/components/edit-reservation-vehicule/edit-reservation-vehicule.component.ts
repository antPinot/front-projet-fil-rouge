import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationVehiculeService } from '../../../core/services/reservation-vehicule.service';
import * as moment from 'moment';

/**
 * 
 * Validateur vérifiant que la date de retour n'est pas postérieure à la date 
 * de départ dans le formulaire de recherche / réservation
 * 
 */
const coherentDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dateDepart = control.get('dateDepart')?.value;
  const dateRetour = control.get('dateRetour')?.value;
  if (dateDepart !== null && dateRetour !== null && moment(dateDepart).isBefore(dateRetour)) {
    return null
  } else {
    return { 'minDate': true }
  }
}

/**
 * Component gérant la modification d'une réservation de véhicule de société
 * 
 * Attention : Ce component n'est pas entièrement fonctionnel et des problèmes de cohérence
 * dans la persistance des données peuvent exister. Il faudra implémenter les contrôles adéquats.
 * 
 */
@Component({
  selector: 'app-edit-reservation-vehicule',
  templateUrl: './edit-reservation-vehicule.component.html',
  styleUrls: ['./edit-reservation-vehicule.component.css']
})
export class EditReservationVehiculeComponent implements OnInit, OnDestroy {

  // @ViewChild('dateDepartPicker') dateDepartPicker!: NgxMatDatetimePicker<any>;

  // @ViewChild('dateRetourPicker') dateRetourPicker!: NgxMatDatetimePicker<any>;

  /** Date du jour */
  currentDate = new Date();

  /** Id du collaborateur connecté */
  collaborateurId?= this.authService.currentCollaborateur?.id;

  /** Réservation de véhicule de société à éditer, récupérée depuis le service */
  reservationVehiculeToEdit = this.reservationVehiculeService.reservationVehiculeSocieteToEdit;

  /** Liste des véhicules de société disponibles */
  listVehiculeSociete$ = this.reservationVehiculeService.listVehicule$

  /** Formulaire de modification d'une réservation de véhicule de société */
  reservationVehiculeEditForm!: FormGroup

  /** Véhicule de société faisant l'objet de la réservation à modifier */
  currentVehiculeSociete = this.reservationVehiculeService.reservationVehiculeSocieteToEdit.vehiculeSociete;

  defaultDateDepart: any

  constructor(private reservationVehiculeService: ReservationVehiculeService, private formBuilder: FormBuilder, private router: Router, private authService:AuthService) { }

  /** Initialisation du formulaire */
  ngOnInit(): void {
    this.reservationVehiculeEditForm = this.formBuilder.group({
      dateDepart: [moment(this.reservationVehiculeToEdit.dateDepart).format(), Validators.required],
      dateRetour: [moment(this.reservationVehiculeToEdit.dateRetour).format(), Validators.required],
    },
    {validators: [coherentDateValidator]})

    // Comportement à revoir éventuellement
    this.reservationVehiculeService.getAllVehiculeSociete().subscribe()
  }

  /** Réinitialisaton de la liste des véhicules de société disponibles à la destruction du component*/
  ngOnDestroy(): void {
    this.listVehiculeSociete$.next([]);
  }

  /** Fonction "précédent" du carrousel */
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

  /** Fonction "suivant" du carrousel */
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

  /** Soumission du formulaire */
  onSubmitForm(){
    let formattedDateDepart = moment(this.reservationVehiculeEditForm.value.dateDepart).format("DD/MM/YYYY HH:mm")
    let formattedDateRetour = moment(this.reservationVehiculeEditForm.value.dateRetour).format("DD/MM/YYYY HH:mm")
    this.reservationVehiculeToEdit.dateDepart = formattedDateDepart;
    this.reservationVehiculeToEdit.dateRetour = formattedDateRetour;
    this.reservationVehiculeToEdit.vehiculeSociete = this.currentVehiculeSociete;
    this.reservationVehiculeToEdit.collaborateurId = this.reservationVehiculeToEdit.collaborateur?.id;
    this.reservationVehiculeToEdit.vehiculeSocieteId = this.reservationVehiculeToEdit.vehiculeSociete?.id;
    this.reservationVehiculeService.updateReservationVehiculeSociete(this.reservationVehiculeToEdit).pipe(
      tap(() => this.reservationVehiculeService.getReservationVehiculeSocieteByCollaborateur(this.collaborateurId, 'en-cours')),
      tap(() => this.router.navigateByUrl('vehicule-societe/reservation/list')),
      catchError((err) => {
        console.log(err)
        return of(0);
      })
    ).subscribe(
    );
  }

}
