import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
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

  /** Formulaire de recherche */
  searchForm!: FormGroup;

  /** Résultat de la recherche : Liste des covoiturages */
  searchResults$ = this.reservationCovoiturageService.listCovoiturageByDateDepart$;

  /** Date courante : Minimum pour effectuer une recherche par date */
  minDate = new Date();

  constructor(private reservationCovoiturageService: ReservationCovoiturageService, private formBuilder: FormBuilder, private authService: AuthService,
    private adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private locale: string) { }

  /** Initialisation du formulaire */
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchDateDepart: [null]
    })
  }

  /** Réinitialisation de la liste des covoiturages disponbiles à la destruction du component */
  ngOnDestroy(): void {
    this.searchResults$.next([]);
  }

  /** Recherche d'un covoiturage par date, formatage de la date récupérér par datetimepicker (Angular Material) via moment.js*/
  onSearch() {
    if (this.collaborateurId) {
      let formattedDate = moment(this.searchForm.value.searchDateDepart).format("DD/MM/YYYY");
      this.reservationCovoiturageService.getCovoiturageByDateDepart(this.collaborateurId, formattedDate).subscribe();
    }

  }


}
