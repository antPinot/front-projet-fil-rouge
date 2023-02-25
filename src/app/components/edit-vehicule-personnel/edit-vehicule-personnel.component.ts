import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { VehiculePersonnelService } from 'src/app/services/vehicule-personnel.service';

const limitePlacesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const places = control.get('places')?.value;
  const limitePlace = control.get('limitePlace')?.value;
  if (places !== null && limitePlace !== null && places > limitePlace) {
    return null
  } else {
    return { 'invalidLimitePlace': true }
  }
}

@Component({
  selector: 'app-edit-vehicule-personnel',
  templateUrl: './edit-vehicule-personnel.component.html',
  styleUrls: ['./edit-vehicule-personnel.component.css']
})
export class EditVehiculePersonnelComponent implements OnInit {

  vehiculePersonnelToEdit = this.vehiculePersonnelService.vehiculePersonnelToEdit;

  vehiculePersonnelToEditForm!: FormGroup

  constructor(private vehiculePersonnelService: VehiculePersonnelService, private formBuilder: FormBuilder, private router: Router) {
  }

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

  onSubmitForm(){
    this.vehiculePersonnelToEdit.immatriculation = this.vehiculePersonnelToEditForm.value.immatriculation;
    this.vehiculePersonnelToEdit.marque = this.vehiculePersonnelToEditForm.value.marque;
    this.vehiculePersonnelToEdit.modele = this.vehiculePersonnelToEditForm.value.modele;
    this.vehiculePersonnelToEdit.places = this.vehiculePersonnelToEditForm.value.places;
    this.vehiculePersonnelToEdit.limitePlace = this.vehiculePersonnelToEditForm.value.limitePlace;
    this.vehiculePersonnelToEdit.collaborateursId = [1]
    this.vehiculePersonnelService.editVehiculePersonnel(this.vehiculePersonnelToEdit).pipe(
      tap(() => this.vehiculePersonnelService.getVehiculePersonnelListByCollaborateurId(1).subscribe())
    ).subscribe();
    this.router.navigateByUrl('vehicule-personnel/list')
  }


}
