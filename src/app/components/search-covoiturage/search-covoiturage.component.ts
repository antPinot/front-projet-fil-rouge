import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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

  constructor(private reservationCovoiturageService: ReservationCovoiturageService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }


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
      this.reservationCovoiturageService.getCovoiturageByDateDepart(this.collaborateurId, this.searchForm.value.searchDateDepart).subscribe();
    }

  }


}
