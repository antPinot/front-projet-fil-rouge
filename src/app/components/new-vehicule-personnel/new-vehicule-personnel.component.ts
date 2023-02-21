import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculePersonnel } from 'src/app/models/vehicule-personnel';
import { VehiculePersonnelService } from 'src/app/services/vehicule-personnel.service';

/**
 * Validateur personnalisé permettant de renvoyer une erreur si
 * la limite de places fixée par le propriétaire
 * du véhicule est supérieure au nombre de places du véhicule
 * 
 * @param control 
 * @returns ValidationsErros ou null 
 */
const limitePlacesValidator : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    const places = control.get('places')?.value;
    const limitePlaces = control.get('limitePlaces')?.value;
    if (places !== null && limitePlaces !== null && places > limitePlaces){
      return null
    } else{
      return {'invalidLimitePlaces' : true}
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
export class NewVehiculePersonnelComponent implements OnInit{

  vehiculePersonnelForm!: FormGroup;
  vehiculePersonnelToCreate: VehiculePersonnel = {
  }

  constructor(private formBuilder: FormBuilder, private router:Router, private vehiculePersonnelService: VehiculePersonnelService) { }

  /**
   * Initialisation du formulaire avec les validateurs
   * 
   */
  ngOnInit(): void {
    this.vehiculePersonnelForm = this.formBuilder.group({
      immatriculation: [null, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
      marque: [null, Validators.required],
      modele: [null, Validators.required],
      places: [null, Validators.required],
      limitePlaces: [null, Validators.required]
    },
    {validators: [limitePlacesValidator]})
  }

  /**
   * Soumission du formulaire et appel du service pour le post
   * du vehicule personnel en BDD. 
   * Note: Le collaborateurId est fixé à 1 en attendant l'implémantation de la fonctionnalité
   * de création d'un collaborateur
   * 
   */
  onSubmitForm(){
    this.vehiculePersonnelToCreate.immatriculation = this.vehiculePersonnelForm.value.immatriculation;
    this.vehiculePersonnelToCreate.marque = this.vehiculePersonnelForm.value.marque;
    this.vehiculePersonnelToCreate.modele = this.vehiculePersonnelForm.value.modele;
    this.vehiculePersonnelToCreate.places = this.vehiculePersonnelForm.value.places;
    this.vehiculePersonnelToCreate.limitePlaces = this.vehiculePersonnelForm.value.limitePlaces;
    this.vehiculePersonnelToCreate.collaborateursId = [1]
    this.vehiculePersonnelService.createVehiculePersonnel(this.vehiculePersonnelToCreate).subscribe();
  }

  



}
