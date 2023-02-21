import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Covoiturage } from 'src/app/models/covoiturage';

@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit{

  covoiturageForm!:FormGroup ;

  /**  constructor injecte formBuilder
 */
  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.covoiturageForm = this.fb.group({
      dateDepart: ['', Validators.required],
      placesRestantes: [0, Validators.required],
      nbPersonnes: [0, Validators.required],
      dureeTrajet: [0, Validators.required],
      distance: [0, Validators.required],
      organisateur: [0, Validators.required],
      vehiculePersonnel: [0, Validators.required],

      adresse: this.fb.group({
        Numero: [0, Validators.required],
        complementNumero: ['', Validators.required],
        voie:['', Validators.required],
        codePostal: [0, Validators.required],
        ville: ['', Validators.required],
        departement:['', Validators.required],
        pays: ['', Validators.required],
      })
    });
  }


  /**methode Onsubmit */ onSubmit() {
    const formData = this.covoiturageForm?.value;
    const covoiturage: Covoiturage = {
      dateDepart: formData.dateDepart,
      placesRestantes: formData.placesRestantes,
      nbPersonnes: formData.nbPersonnes,
      dureeTrajet: formData.dureeTrajet,
      distance: formData.distance,
      organisateur: formData.organisateur,
      vehiculePersonnel: formData.vehiculePersonnel,
      adresse: formData.adresse
    };
    console.log(covoiturage);
  }


}
