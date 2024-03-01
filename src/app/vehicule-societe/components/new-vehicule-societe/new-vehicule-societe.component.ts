import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { VehiculeSociete } from '../../../core/models/vehicule-societe';
import { VehiculeSocieteService } from '../../../core/services/vehicule-societe.service';

@Component({
  selector: 'app-vehicule-societe',
  templateUrl: './new-vehicule-societe.component.html',
  styleUrls: ['./new-vehicule-societe.component.css']
})
export class NewVehiculeSocieteComponent implements OnInit, OnDestroy{

  vSForm!: FormGroup;
  vehiculeSocieteToCreate: VehiculeSociete = {}

  vehiculeSocieteToEdit:VehiculeSociete = this._vehiculeSocieteService.vehiculeSocieteToEdit

  allCategories!: String[]

  hasVehiculeToEdit: boolean  = false

  constructor(private builder: FormBuilder, private _vehiculeSocieteService: VehiculeSocieteService, private router:Router) { };

  ngOnInit() {
    this.vehiculeSocieteToEdit != null ? this.hasVehiculeToEdit = Object.values(this.vehiculeSocieteToEdit).length != 0 : this.hasVehiculeToEdit = false;
    this._vehiculeSocieteService.getAllCategories().pipe(tap((categories) => this.allCategories = categories)).subscribe()
    if (this.hasVehiculeToEdit){
      this._vehiculeSocieteService.findCategorieNameByCategorie(this.vehiculeSocieteToEdit.categorie).pipe(tap((categorieToDisplay) => {
        this.vSForm = this.builder.group({
          immatriculation: [this.vehiculeSocieteToEdit.immatriculation, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
          marque: [this.vehiculeSocieteToEdit.marque, Validators.required],
          modele: [this.vehiculeSocieteToEdit.modele, Validators.required],
          places: [this.vehiculeSocieteToEdit.places, Validators.required],
          photo: [this.vehiculeSocieteToEdit.photo, Validators.required],
          disponible: [true, Validators.required],
          statut: [this.vehiculeSocieteToEdit.statut, Validators.required],
          categorie: [categorieToDisplay, Validators.required]
        })
        
      })).subscribe()
      
    } else {
      this.vSForm = this.builder.group({
        immatriculation: [null, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
        marque: [null, Validators.required],
        modele: [null, Validators.required],
        places: [null, Validators.required],
        photo: [null, Validators.required],
        disponible: [true, Validators.required],
        statut: [1, Validators.required],
        categorie: [null, Validators.required]
      })
    }

    
  }
  
  onSubmit() {
    console.log(this.vSForm.value.statut)
    this.vehiculeSocieteToCreate.immatriculation = this.vSForm.value.immatriculation;
    this.vehiculeSocieteToCreate.marque = this.vSForm.value.marque;
    this.vehiculeSocieteToCreate.modele = this.vSForm.value.modele;
    this.vehiculeSocieteToCreate.places = this.vSForm.value.places;
    this.vehiculeSocieteToCreate.photo = this.vSForm.value.photo;
    this.vehiculeSocieteToCreate.disponible = this.vSForm.value.disponible;
    this.vehiculeSocieteToCreate.statut = this.vSForm.value.statut;
    this.vehiculeSocieteToCreate.categorie = this.vSForm.value.categorie;
    this.hasVehiculeToEdit ? console.log(this.vehiculeSocieteToEdit) : this._vehiculeSocieteService.createOne(this.vehiculeSocieteToCreate).subscribe(() => console.log(this.vehiculeSocieteToCreate));
    this.router.navigateByUrl('/vehicule-societe/list')
  }

  ngOnDestroy(): void {
    this._vehiculeSocieteService.vehiculeSocieteToEdit = {}
  }

}
