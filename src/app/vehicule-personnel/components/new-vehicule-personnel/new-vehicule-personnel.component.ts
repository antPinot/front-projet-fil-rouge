import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { VehiculePersonnel } from '../../../core/models/vehicule-personnel';
import { AuthService } from '../../../core/services/auth.service';
import { VehiculePersonnelService } from '../../../core/services/vehicule-personnel.service';

/**
 * Validateur personnalisé permettant de renvoyer une erreur si
 * la limite de places fixée par le propriétaire
 * du véhicule est supérieure au nombre de places du véhicule
 * 
 * @param control 
 * @returns ValidationsErros ou null 
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
 * Component de création d'un nouveau Véhicule Personnel
 * (associé à un ou plusieurs collaborateurs)
 * 
 */
@Component({
  selector: 'app-new-vehicule-personnel',
  templateUrl: './new-vehicule-personnel.component.html',
  styleUrls: ['./new-vehicule-personnel.component.css']
})
export class NewVehiculePersonnelComponent implements OnInit, OnDestroy {

  collaborateurId?= this.authService.currentCollaborateur?.id;

  vehiculePersonnelForm!: FormGroup;

  vehiculePersonnelToSubmit: VehiculePersonnel = {
  }

  vehiculePersonnelToEdit = this.vehiculePersonnelService.vehiculePersonnelToEdit

  hasVehiculePersonnelToEdit!: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private vehiculePersonnelService: VehiculePersonnelService, private authService: AuthService) { }

  /**
   * Initialisation du formulaire avec les validateurs
   * 
   */
  ngOnInit(): void {
    this.vehiculePersonnelToEdit != null ? this.hasVehiculePersonnelToEdit = Object.values(this.vehiculePersonnelToEdit).length != 0 : this.hasVehiculePersonnelToEdit = false;
    if (this.hasVehiculePersonnelToEdit){
        this.vehiculePersonnelForm = this.formBuilder.group({
          immatriculation: [this.vehiculePersonnelToEdit.immatriculation, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
          marque: [this.vehiculePersonnelToEdit.marque, Validators.required],
          modele: [this.vehiculePersonnelToEdit.modele, Validators.required],
          places: [this.vehiculePersonnelToEdit.places, Validators.required],
          limitePlace: [this.vehiculePersonnelToEdit.limitePlace, Validators.required]
        },
        { validators: [limitePlacesValidator] })
    } else {
      this.vehiculePersonnelForm = this.formBuilder.group({
        immatriculation: [null, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
        marque: [null, Validators.required],
        modele: [null, Validators.required],
        places: [null, Validators.required],
        limitePlace: [null, Validators.required]
      },
        { validators: [limitePlacesValidator] })
    }
    
  }

  /**
   * Soumission du formulaire et appel du service pour le post
   * du vehicule personnel en BDD. 
   * Note: Le collaborateurId est fixé à 1 en attendant l'implémantation de la fonctionnalité
   * de création d'un collaborateur
   * 
   */
  onSubmitForm() {
    if (this.hasVehiculePersonnelToEdit ){
      this.vehiculePersonnelToSubmit.id = this.vehiculePersonnelToEdit.id;
    } 
    if (this.collaborateurId) {
      this.vehiculePersonnelToSubmit.immatriculation = this.vehiculePersonnelForm.value.immatriculation;
      this.vehiculePersonnelToSubmit.marque = this.vehiculePersonnelForm.value.marque;
      this.vehiculePersonnelToSubmit.modele = this.vehiculePersonnelForm.value.modele;
      this.vehiculePersonnelToSubmit.places = this.vehiculePersonnelForm.value.places;
      this.vehiculePersonnelToSubmit.limitePlace = this.vehiculePersonnelForm.value.limitePlace;
      this.vehiculePersonnelToSubmit.collaborateursId = [this.collaborateurId];
    }
    this.hasVehiculePersonnelToEdit ? 
    this.vehiculePersonnelService.editVehiculePersonnel(this.vehiculePersonnelToSubmit).pipe(
      tap(() => this.vehiculePersonnelService.getVehiculePersonnelListByCollaborateurId(this.collaborateurId).subscribe())
    ).subscribe() :
    this.vehiculePersonnelService.createVehiculePersonnel(this.vehiculePersonnelToSubmit).pipe(
      tap(() => this.vehiculePersonnelService.getVehiculePersonnelListByCollaborateurId(this.collaborateurId).subscribe())
    ).subscribe();
    this.router.navigateByUrl('vehicule-personnel/list')
  }

  backToList(){
    this.router.navigateByUrl('/vehicule-personnel/list')
  }

  ngOnDestroy(): void {
    this.vehiculePersonnelService.vehiculePersonnelToEdit = {}
  }

}
