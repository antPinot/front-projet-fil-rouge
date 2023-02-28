import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeSocieteService } from 'src/app/services/vehicule-societe.service';

@Component({
  selector: 'app-edit-vehicule-societe',
  templateUrl: './edit-vehicule-societe.component.html',
  styleUrls: ['./edit-vehicule-societe.component.css']
})
export class EditVehiculeSocieteComponent implements OnInit {

  vSFormEdit!: FormGroup;
  vehiculeSocieteToEdit = this._vehiculeSocieteService.vehiculeSocieteToEdit;

  constructor(private builder: FormBuilder, private _vehiculeSocieteService: VehiculeSocieteService) { };

  ngOnInit() {
    this.vSFormEdit = this.builder.group({
      immatriculation: [this.vehiculeSocieteToEdit.immatriculation, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
      marque: [this.vehiculeSocieteToEdit.marque, Validators.required],
      modele: [this.vehiculeSocieteToEdit.modele, Validators.required],
      places: [this.vehiculeSocieteToEdit.places, Validators.required],
      photo: [this.vehiculeSocieteToEdit.photo, Validators.required],
      disponible: [this.vehiculeSocieteToEdit.disponible, Validators.required],
      statut: [this.vehiculeSocieteToEdit.statut, Validators.required],
      categorie: [this.vehiculeSocieteToEdit.categorie, Validators.required]
    })
  }
  
  onSubmit() {
    this.vehiculeSocieteToEdit.immatriculation = this.vSFormEdit.value.immatriculation;
    this.vehiculeSocieteToEdit.marque = this.vSFormEdit.value.marque;
    this.vehiculeSocieteToEdit.modele = this.vSFormEdit.value.modele;
    this.vehiculeSocieteToEdit.places = this.vSFormEdit.value.places;
    this.vehiculeSocieteToEdit.photo = this.vSFormEdit.value.photo;
    this.vehiculeSocieteToEdit.disponible = this.vSFormEdit.value.disponible;
    this.vehiculeSocieteToEdit.statut = this.vSFormEdit.value.statut;
    this.vehiculeSocieteToEdit.categorie = this.vSFormEdit.value.categorie;
    this._vehiculeSocieteService.editOne(this.vehiculeSocieteToEdit).subscribe();
  }

}
