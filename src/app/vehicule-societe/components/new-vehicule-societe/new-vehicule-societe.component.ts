import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeSociete } from '../../../core/models/vehicule-societe';
import { VehiculeSocieteService } from '../../../core/services/vehicule-societe.service';

@Component({
  selector: 'app-vehicule-societe',
  templateUrl: './new-vehicule-societe.component.html',
  styleUrls: ['./new-vehicule-societe.component.css']
})
export class NewVehiculeSocieteComponent implements OnInit{

  vSForm!: FormGroup;
  vehiculeSocieteToCreate: VehiculeSociete = {}

  constructor(private builder: FormBuilder, private _vehiculeSocieteService: VehiculeSocieteService) { };

  ngOnInit() {
    this.vSForm = this.builder.group({
      immatriculation: [null, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
      marque: [null, Validators.required],
      modele: [null, Validators.required],
      places: [null, Validators.required],
      photo: [null, Validators.required],
      disponible: [null, Validators.required],
      statut: [null, Validators.required],
      categorie: [null, Validators.required]
    })
  }
  
  onSubmit() {
    this.vehiculeSocieteToCreate.immatriculation = this.vSForm.value.immatriculation;
    this.vehiculeSocieteToCreate.marque = this.vSForm.value.marque;
    this.vehiculeSocieteToCreate.modele = this.vSForm.value.modele;
    this.vehiculeSocieteToCreate.places = this.vSForm.value.places;
    this.vehiculeSocieteToCreate.photo = this.vSForm.value.photo;
    this.vehiculeSocieteToCreate.disponible = this.vSForm.value.disponible;
    this.vehiculeSocieteToCreate.statut = this.vSForm.value.statut;
    this.vehiculeSocieteToCreate.categorie = this.vSForm.value.categorie;
    this._vehiculeSocieteService.createOne(this.vehiculeSocieteToCreate).subscribe();
  }
}
