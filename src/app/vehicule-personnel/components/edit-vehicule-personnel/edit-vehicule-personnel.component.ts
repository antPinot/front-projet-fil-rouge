import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { VehiculePersonnelService } from '../../../core/services/vehicule-personnel.service';

/**
 * 
 * Validateur de vérifier que la limite de place alloué par le propriétaire du véhicule personnel
 * n'est pas supérieure au nombre de places disponibles dans le véhicule
 * 
 * @param control 
 * @returns 
 */
const limitePlacesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const places = control.get('places')?.value;
  const limitePlace = control.get('limitePlace')?.value;
  if (places !== null && limitePlace !== null && places > limitePlace) {
    return null
  } else {
    return { 'invalidLimitePlace': true }
  }
}

/**
 * 
 * Component qui gère la modification d'un véhicule personnel
 * 
 */
@Component({
  selector: 'app-edit-vehicule-personnel',
  templateUrl: './edit-vehicule-personnel.component.html',
  styleUrls: ['./edit-vehicule-personnel.component.css']
})
export class EditVehiculePersonnelComponent implements OnInit {

  /** Id du collaborateur connecté */
  collaborateurId?= this.authService.currentCollaborateur?.id;

  /** Véhicule personnel à éditer récupéré depuis le service */
  vehiculePersonnelToEdit = this.vehiculePersonnelService.vehiculePersonnelToEdit;

  /** Formulaire de modification du véhicule personnel */
  vehiculePersonnelToEditForm!: FormGroup

  constructor(private vehiculePersonnelService: VehiculePersonnelService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  }

  /**
   * Initialisation du formulaire de modification d'un véhicule personnel
   * Vérification que l'immatriculation est bien au format AA-123-BB
   */
  ngOnInit(): void {
    this.vehiculePersonnelToEditForm = this.formBuilder.group({
      immatriculation: [this.vehiculePersonnelToEdit.immatriculation, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
      marque: [this.vehiculePersonnelToEdit.marque, Validators.required],
      modele: [this.vehiculePersonnelToEdit.modele, Validators.required],
      places: [this.vehiculePersonnelToEdit.places, Validators.required],
      limitePlace: [this.vehiculePersonnelToEdit.limitePlace, Validators.required]
    },
      { validators: [limitePlacesValidator] })
  }

  /** Soummission du formulaire */
  onSubmitForm() {
    if (this.collaborateurId) {
      this.vehiculePersonnelToEdit.immatriculation = this.vehiculePersonnelToEditForm.value.immatriculation;
      this.vehiculePersonnelToEdit.marque = this.vehiculePersonnelToEditForm.value.marque;
      this.vehiculePersonnelToEdit.modele = this.vehiculePersonnelToEditForm.value.modele;
      this.vehiculePersonnelToEdit.places = this.vehiculePersonnelToEditForm.value.places;
      this.vehiculePersonnelToEdit.limitePlace = this.vehiculePersonnelToEditForm.value.limitePlace;
      this.vehiculePersonnelToEdit.collaborateursId = [this.collaborateurId]
    }
    this.vehiculePersonnelService.editVehiculePersonnel(this.vehiculePersonnelToEdit).pipe(
      tap(() => this.vehiculePersonnelService.getVehiculePersonnelListByCollaborateurId(this.collaborateurId).subscribe())
    ).subscribe();
    this.router.navigateByUrl('vehicule-personnel/list')
  }


}
