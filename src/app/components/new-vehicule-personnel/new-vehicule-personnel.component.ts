import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculePersonnel } from 'src/app/models/vehicule-personnel';
import { VehiculePersonnelService } from 'src/app/services/vehicule-personnel.service';

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

  ngOnInit(): void {
    this.vehiculePersonnelForm = this.formBuilder.group({
      immatriculation: [null, Validators.required],
      marque: [null, Validators.required],
      modele: [null, Validators.required],
      places: [null, Validators.required],
      limitePlaces: [null, Validators.required],
    })
  }

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
