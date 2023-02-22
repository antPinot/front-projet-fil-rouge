import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Covoiturage } from 'src/app/models/covoiturage';
import { CovoiturageService } from 'src/app/services/covoiturage.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit{
  

  @Input()
  covoiturageForm!:FormGroup ;

  covoiturage$ = this._covoiturageService.covoiturage$; //initialisation de covoiturages$

  /**  constructor injecte formBuilder
   * 
   * ici dans le constructor ajouter Covoiturageservice
 */
  constructor(private fb: FormBuilder, private _covoiturageService: CovoiturageService) {}
   

  ngOnInit(){

    this._covoiturageService.findAll().subscribe();

    this.covoiturageForm = this.fb.group({
      dateDepart: ['', Validators.required],
      placesRestantes: [0, Validators.required],
      nbPersonnes: [0, Validators.required],
      dureeTrajet: [0, Validators.required],
      distance: [0, Validators.required],
      organisateur: [0, Validators.required],
      vehiculePersonnel: [0, Validators.required],

      adresseDepart: this.fb.group({
        Numero: [0, Validators.required],
        complementNumero: ['', Validators.required],
        voie:['', Validators.required],
        codePostal: [0, Validators.required],
        ville: ['', Validators.required],
        departement:['', Validators.required],
        pays: ['', Validators.required],
      }),


      adresseArrivee: this.fb.group({
        Numero:[0, Validators.required],
        complementNumero:['',Validators.required],
        voie:['',Validators.required],
        codePostal:[0, Validators.required],
        ville:['', Validators.required],
        departement:['', Validators.required],
        pays: ['', Validators.required],
      })
    });


    /**appel au service */
  }


  /**methode Onsubmit */ onSubmit() {
    const formData = this.covoiturageForm?.value;
    const covoiturage: Covoiturage = {
      dateDepart: formData.dateDepart,
      placesRestantes: formData.placesRestantes,
      nbPersonnes: formData.nbPersonnes,
      dureeTrajet: formData.dureeTrajet,
      distance: formData.distance,
      organisateurId: formData.organisateur,
      vehiculePersonnelId: formData.vehiculePersonnel,
      adresseDepart: formData.adresseDepart,
      adresseArrivee: formData.adresseArrivee,
      id: undefined
    };
    console.log(covoiturage);
    this._covoiturageService.createOne(covoiturage).subscribe();
  }


  /**methode supprime un covoiturage */
  deleteCovoiturage(covoiturage: Covoiturage){
    if(covoiturage.id){
      this._covoiturageService.deleteOne(covoiturage.id).subscribe();
    }
  }

  /**methode edit un covoiturage */

  @Input()
  covoiturage!: Covoiturage;
  
  editerCovoiturage(covoiturage: Covoiturage) {
    if (covoiturage.id) {
      this._covoiturageService.editOne(covoiturage.id).subscribe(
        (result: any) => {
          console.log("Covoiturage mis à jour avec succès : ", result);
        },
        (error: any) => {
          console.log("Erreur lors de la mise à jour du covoiturage : ", error);
        }
      );
    }
  }
  


}
