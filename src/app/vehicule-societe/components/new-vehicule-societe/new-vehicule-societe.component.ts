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
  vehiculeSocieteToSubmit: VehiculeSociete = {}

  vehiculeSocieteToEdit:VehiculeSociete = this._vehiculeSocieteService.vehiculeSocieteToEdit

  allCategories!: String[]

  hasVehiculeToEdit: boolean  = false

  constructor(private builder: FormBuilder, private _vehiculeSocieteService: VehiculeSocieteService, private router:Router) { };

  ngOnInit() {
    this.vehiculeSocieteToEdit != null ? this.hasVehiculeToEdit = Object.values(this.vehiculeSocieteToEdit).length != 0 : this.hasVehiculeToEdit = false;
    this._vehiculeSocieteService.getAllCategories().pipe(tap((categories) => this.allCategories = categories)).subscribe()
    if (this.hasVehiculeToEdit){
      this._vehiculeSocieteService.findCategorieNameByCategorie(this.vehiculeSocieteToEdit.categorie).pipe(tap((categorieToDisplay:string) => {
        this.vehiculeSocieteToEdit.categorie = categorieToDisplay
        this.vSForm = this.builder.group({
          immatriculation: [this.vehiculeSocieteToEdit.immatriculation, [Validators.required, Validators.pattern('[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}')]],
          marque: [this.vehiculeSocieteToEdit.marque, Validators.required],
          modele: [this.vehiculeSocieteToEdit.modele, Validators.required],
          places: [this.vehiculeSocieteToEdit.places, Validators.required],
          photo: [this.vehiculeSocieteToEdit.photo, Validators.required],
          disponible: [true, Validators.required],
          statut: [this.vehiculeSocieteToEdit.statut, Validators.required],
          categorie: [this.vehiculeSocieteToEdit.categorie, Validators.required]
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
    if (this.hasVehiculeToEdit ){
      this.vehiculeSocieteToSubmit.id = this.vehiculeSocieteToEdit.id;
    } 
    this.vehiculeSocieteToSubmit.immatriculation = this.vSForm.value.immatriculation;
    this.vehiculeSocieteToSubmit.marque = this.vSForm.value.marque;
    this.vehiculeSocieteToSubmit.modele = this.vSForm.value.modele;
    this.vehiculeSocieteToSubmit.places = this.vSForm.value.places;
    this.vehiculeSocieteToSubmit.photo = this.vSForm.value.photo;
    this.vehiculeSocieteToSubmit.disponible = this.vSForm.value.disponible;
    this.vehiculeSocieteToSubmit.statut = this.vSForm.value.statut;
    this.vehiculeSocieteToSubmit.categorie = this.vSForm.value.categorie;
    this.hasVehiculeToEdit ? this._vehiculeSocieteService.editOne(this.vehiculeSocieteToSubmit).subscribe() : this._vehiculeSocieteService.createOne(this.vehiculeSocieteToSubmit).subscribe();
    this.backToList()
  }

  backToList(){
    this.router.navigateByUrl('/vehicule-societe/list')
  }

  ngOnDestroy(): void {
    this._vehiculeSocieteService.vehiculeSocieteToEdit = {}
  }

}
