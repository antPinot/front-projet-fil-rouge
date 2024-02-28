import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Covoiturage } from 'src/app/core/models/covoiturage';
import { VehiculePersonnel } from 'src/app/core/models/vehicule-personnel';
import { AdresseService } from 'src/app/core/services/adresse.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CovoiturageService } from 'src/app/core/services/covoiturage.service';
import { VehiculePersonnelService } from 'src/app/core/services/vehicule-personnel.service';

@Component({
  selector: 'app-covoiturage-edit',
  templateUrl: './covoiturage-edit.component.html',
  styleUrls: ['./covoiturage-edit.component.css']
})
export class CovoiturageEditComponent implements OnInit{

  //TODO: A mettre dans un service pour éviter duplication
  /** Id du collaborateur connecté */
  collaborateurId? = this.authService.currentCollaborateur?.id;
  
  public covoiturage$  = new BehaviorSubject<Covoiturage>({});

  public covoiturageToEditForm! : FormGroup;

  /** Liste de véhicules personnels du collaborateur */
  vehiculePersonnelList$ =
    this.vehiculePersonnelService.vehiculePersonnelListByCollaborateurId$;

  //TODO: A mettre dans un service pour éviter duplication
  /** Date du jour  */
  currentDate = new Date();

  placesSelector: number[] = [];

  constructor(private _activatedRoute: ActivatedRoute, private _covoiturageService: CovoiturageService, private vehiculePersonnelService: VehiculePersonnelService, private adresseService:AdresseService, private formBuilder: FormBuilder, private authService:AuthService ){
  }

  ngOnInit(): void {

    this.vehiculePersonnelService
    .getVehiculePersonnelListByCollaborateurId(this.collaborateurId)
    .subscribe();

    this._activatedRoute.paramMap.subscribe(paramMap => {
      let n: string = paramMap.get('id') as string;
      this._covoiturageService.findById(n)
        .pipe(
          tap((covoiturage) => {
            if (covoiturage.adresseDepart && covoiturage.adresseArrivee)
            this.covoiturageToEditForm = this.formBuilder.group({
              dateDepart: [covoiturage.dateDepart, Validators.required],
              adresseDepart : [this.adresseService.displayAdresse(covoiturage.adresseDepart), Validators.required],
              adresseArrivee : [this.adresseService.displayAdresse(covoiturage.adresseArrivee), Validators.required],
              nbPlaces: [covoiturage.placesRestantes, Validators.required],
              vehicule: [covoiturage.vehiculePersonnel, Validators.required],
            });
            this.covoiturage$.next(covoiturage);
          })
        ).subscribe();
    });
  }

  fillPlacesSelector() {
    let selectedVehicle: VehiculePersonnel =
      this.covoiturageToEditForm.get('vehicule')?.value;
    if (selectedVehicle.limitePlace != null) {
      for (let i = 1; i <= selectedVehicle.limitePlace; i++) {
        this.placesSelector.push(i);
      }
    }
  }

}
