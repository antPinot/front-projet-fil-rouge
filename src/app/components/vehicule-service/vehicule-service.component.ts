import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from 'src/app/models/vehicule-service';

@Component({
  selector: 'app-vehicule-service',
  templateUrl: './vehicule-service.component.html',
  styleUrls: ['./vehicule-service.component.css']
})
export class VehiculeServiceComponent implements OnInit{

  vSForm!: FormGroup;
  vehiculeServiceToCreate: VehiculeService = {}

  constructor(private builder: FormBuilder) { };

  ngOnInit() {
    this.vSForm = this.builder.group({
      immatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      places: [0, Validators.required],
      disponible: [0, Validators.required],
      statut: [0, Validators.required],
      idCategorie: [0, Validators.required]
    })
  }
  
  onSubmit() {
    const data = this.vSForm?.value;
      const covoiturage: VehiculeService = {
        immatriculation: data.immatriculation, marque: data.marque,modele: data.modele, places: data.places, 
        disponible: data.disponible, statut: data.statut, idCategorie: data.idCategorie
      };
    }
  }
