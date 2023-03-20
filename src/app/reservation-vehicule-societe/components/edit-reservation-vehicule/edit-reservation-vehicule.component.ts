import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationVehiculeService } from '../../../core/services/reservation-vehicule.service';

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

  constructor(private reservationVehiculeService: ReservationVehiculeService, private formBuilder: FormBuilder, private router: Router, private authService:AuthService) { }

  /** Initialisation du formulaire */
  ngOnInit(): void {
    this.reservationVehiculeEditForm = this.formBuilder.group({
      dateDepart: [this.reservationVehiculeToEdit.dateDepart, Validators.required],
      dateRetour: [this.reservationVehiculeToEdit.dateRetour, Validators.required],
    })
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
