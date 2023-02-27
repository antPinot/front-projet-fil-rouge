import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Covoiturage } from 'src/app/models/covoiturage';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';

@Component({
  selector: 'app-detail-reservation-covoiturage',
  templateUrl: './detail-reservation-covoiturage.component.html',
  styleUrls: ['./detail-reservation-covoiturage.component.css']
})
export class DetailReservationCovoiturageComponent implements OnInit {

  collaborateurId?= this.authService.currentCollaborateur?.id;

  covoiturage!: Covoiturage

  reservable!: boolean

  constructor(public dialogRef: MatDialogRef<DetailReservationCovoiturageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Covoiturage, private reservationCovoiturageService: ReservationCovoiturageService, private router: Router,
    private authService: AuthService) {
    this.covoiturage = { ...data }
  }
  ngOnInit(): void {
    this.router.url == '/covoiturage/reservation/search' ? this.reservable = true : this.reservable = false
  }

  onBook() {
    if (this.collaborateurId) {
      this.reservationCovoiturageService.reserverCovoiturage(this.collaborateurId, this.covoiturage).pipe(
        tap((bookedCovoiturage) => {
          let updatedResultList = this.reservationCovoiturageService.listCovoiturageByDateDepart$.value.filter(c => c.id != bookedCovoiturage.id);
          this.reservationCovoiturageService.listCovoiturageByDateDepart$.next(updatedResultList);
        }),
        tap(() => this.router.navigateByUrl('/covoiturage/reservation/list'))
      ).subscribe()
    }

  }

}
