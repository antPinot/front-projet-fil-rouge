import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { VehiculePersonnel } from 'src/app/core/models/vehicule-personnel';
import { AuthService } from 'src/app/core/services/auth.service';
import { VehiculePersonnelService } from 'src/app/core/services/vehicule-personnel.service';

/**
 * Validateur vérifiant que le nb de places défini par l'utilisateur n'est pas supérieure à la capacité du véhicule
 * 
 * @param control 
 * @returns 
 */
const coherentNbPlacesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const vehicule : VehiculePersonnel = control.get('vehicule')?.value;
  const nbPlaces : number = control.get('nbPlaces')?.value;
  if (vehicule !== null && nbPlaces !== null && nbPlaces && vehicule.limitePlace !=null && nbPlaces< vehicule.limitePlace) {
    return null
  } else {
    return { 'nbPlacesIncoherent': true }
  }
}

@Component({
  selector: 'app-covoiturage-detailed-infos',
  templateUrl: './covoiturage-detailed-infos.component.html',
  styleUrls: ['./covoiturage-detailed-infos.component.css']
})

export class CovoiturageDetailedInfosComponent implements OnInit {

  /** Id du collaborateur connecté */
  collaborateurId? = this.authService.currentCollaborateur?.id;

  /** Liste de véhicules personnels du collaborateur */
  vehiculePersonnelList$ = this.vehiculePersonnelService.vehiculePersonnelListByCollaborateurId$

  /** Date du jour */
  currentDate = new Date();

  covoiturageDetailsForm! : FormGroup

  constructor(private formBuilder: FormBuilder, private vehiculePersonnelService: VehiculePersonnelService, private authService:AuthService){}
  ngOnInit(): void {
    this.covoiturageDetailsForm = this.formBuilder.group({
      dateDepart : [null, Validators.required],
      vehicule : [null, Validators.required],
      nbPlaces : [null, Validators.required],
    },
    {validators : [coherentNbPlacesValidator]})

    this.vehiculePersonnelService.getVehiculePersonnelListByCollaborateurId(this.collaborateurId).subscribe();
  }

    

}
