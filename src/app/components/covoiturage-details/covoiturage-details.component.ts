import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { Covoiturage } from 'src/app/models/covoiturage';
import { CovoiturageService } from 'src/app/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-details',
  templateUrl: './covoiturage-details.component.html',
  styleUrls: ['./covoiturage-details.component.css']
})
export class CovoiturageDetailsComponent {

  public covoiturage$  = new BehaviorSubject<Covoiturage>({});
  public covoiturageFormGroup! : FormGroup;
  //fb: any;


  //inject activatedRoute
  constructor(private _activatedRoute: ActivatedRoute, private _covoiturageService: CovoiturageService,private fb: FormBuilder ){
  /**recuperation des params de la route ici id */

  this._activatedRoute.paramMap.subscribe(paramMap =>{

    let n: string = paramMap.get('id')as string  
    
    this._covoiturageService.findById(n).subscribe( data => this.covoiturage$.next(data) )
    
   });
  }


  ngOnInit(){

    //this._covoiturageService.findAll().subscribe();

    this.covoiturageFormGroup = this.fb.group({
      dateDepart: ['', Validators.required],
      placesRestantes: [0, Validators.required],
      nbPersonnes: [0, Validators.required],
      dureeTrajet: [0, Validators.required],
      distance: [0, Validators.required],
      organisateur: [0, Validators.required],
      vehiculePersonnel: [0, Validators.required],

      adresseDepart: this.fb.group({
        numero: 0,
        complementNumero: '',
        voie:['', Validators.required],
        codePostal: [0, Validators.required],
        ville: ['', Validators.required],
        departement:['', Validators.required],
        pays: ['', Validators.required],
      }),

      adresseArrivee: this.fb.group({
        numero: 0,
        complementNumero: '',
        voie:['', Validators.required],
        codePostal: [0, Validators.required],
        ville: ['', Validators.required],
        departement:['', Validators.required],
        pays: ['', Validators.required],
      }),
    });
  }

  /**methode Onsubmit */ onSubmit() {
     
  }



  /**methode edit un covoiturage */

  @Input()
  covoiturage!: Covoiturage;
  
  editerCovoiturage(covoiturage: Covoiturage) {
    const formData = this.covoiturageFormGroup?.value;
    covoiturage = {
      dateDepart: formData.dateDepart,
      placesRestantes: formData.placesRestantes,
      nbPersonnes: formData.nbPersonnes,
      dureeTrajet: formData.dureeTrajet,
      distance: formData.distance,
      organisateurId: formData.organisateur,
      vehiculePersonnelId: formData.vehiculePersonnel,
      adresseDepart: formData.adresseDepart,
      adresseArrivee: formData.adresseArrivee,
      id : this.covoiturage$.value.id
    };
    console.log(covoiturage);


    if (covoiturage) {
      this._covoiturageService.editOne(covoiturage).subscribe(
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
