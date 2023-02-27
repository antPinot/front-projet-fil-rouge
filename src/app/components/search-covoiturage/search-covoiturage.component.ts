import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';

@Component({
  selector: 'app-search-covoiturage',
  templateUrl: './search-covoiturage.component.html',
  styleUrls: ['./search-covoiturage.component.css']
})
export class SearchCovoiturageComponent implements OnInit, OnDestroy {

  collaborateurId?= this.authService.currentCollaborateur?.id;

  searchForm!: FormGroup;

  searchResults$ = this.reservationCovoiturageService.listCovoiturageByDateDepart$;

  constructor(private reservationCovoiturageService: ReservationCovoiturageService, private formBuilder: FormBuilder, private authService: AuthService,
    private adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private locale:string) { }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchDateDepart: [null]
    })
  }

  ngOnDestroy(): void {
    this.searchResults$.next([]);
  }

  onSearch() {
    if (this.collaborateurId) {
      //console.log(this.searchForm.value.searchDateDepart)
      let formattedDate = moment(this.searchForm.value.searchDateDepart).format("DD/MM/YYYY");
      this.reservationCovoiturageService.getCovoiturageByDateDepart(this.collaborateurId, formattedDate).subscribe();
    }

  }


}
