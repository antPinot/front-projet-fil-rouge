import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { map } from 'rxjs';
import { AdresseService } from 'src/app/services/adresse.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';

/**
 * Component gérant la recherche d'un covoiturage
 * 
 */
@Component({
  selector: 'app-search-covoiturage',
  templateUrl: './search-covoiturage.component.html',
  styleUrls: ['./search-covoiturage.component.css']
})
export class SearchCovoiturageComponent implements OnInit, OnDestroy {

  /** Id du collaborateur connecté */
  collaborateurId?= this.authService.currentCollaborateur?.id;

  adressesResult = this.adresseService.listAdressesForAutocomplete$

  /** Formulaire de recherche */
  searchForm!: FormGroup;

  /** Résultat de la recherche : Liste des covoiturages */
  searchResults$ = this.reservationCovoiturageService.listCovoiturageByDateDepart$;

  /** Date courante : Minimum pour effectuer une recherche par date */
  minDate = new Date();

  constructor(private reservationCovoiturageService: ReservationCovoiturageService, private formBuilder: FormBuilder, private authService: AuthService, private adresseService: AdresseService,
    private adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private locale: string) { }

  /** Initialisation du formulaire */
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      adresseDepart: [null],
      adresseArrivee: [null],
      searchDateDepart: [null, Validators.required]
    })

    /*this.searchForm.get('adresseArrivee')?.valueChanges.pipe(
      map((adresseSearch) => this.adresseService.findByUserQuery(adresseSearch).subscribe())
    ).subscribe()*/
  }

  onKeyupAdresseDepart() {
    let valueInput = this.searchForm.get('adresseDepart')?.value;
    console.log(valueInput)
    this.adresseService.findByUserQuery(valueInput).subscribe()
  }

  onKeyupAdresseArrivee() {
    let valueInput = this.searchForm.get('adresseArrivee')?.value;
    this.adresseService.findByUserQuery(valueInput).subscribe()
  }

  /** Réinitialisation de la liste des covoiturages disponbiles à la destruction du component */
  ngOnDestroy(): void {
    this.searchResults$.next([]);
  }

  /** Recherche d'un covoiturage par date, formatage de la date récupérér par datetimepicker (Angular Material) via moment.js*/
  onSearch() {
    if (this.collaborateurId) {
      let formattedDate = moment(this.searchForm.value.searchDateDepart).format("DD/MM/YYYY");
      console.log(this.searchForm.value.adresseDepart)
      if ((this.searchForm.value.adresseDepart == null  || this.searchForm.value.adresseDepart == "") && (this.searchForm.value.adresseArrivee == null || this.searchForm.value.adresseArrivee == "")) {
        this.reservationCovoiturageService.getCovoiturageByCriteres(this.collaborateurId, 0, 0, formattedDate).subscribe();
      } else if (this.searchForm.value.adresseArrivee == null || this.searchForm.value.adresseArrivee == "") {
        this.reservationCovoiturageService.getCovoiturageByCriteres(this.collaborateurId, this.searchForm.value.adresseDepart.id, 0, formattedDate).subscribe();
      } else if (this.searchForm.value.adresseDepart == null || this.searchForm.value.adresseDepart == "") {
        this.reservationCovoiturageService.getCovoiturageByCriteres(this.collaborateurId, 0, this.searchForm.value.adresseArrivee.id, formattedDate).subscribe();
      } else {
        console.log("erreur");
      }
    }
  }


}
