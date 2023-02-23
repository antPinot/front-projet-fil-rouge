import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Covoiturage } from 'src/app/models/covoiturage';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';

@Component({
  selector: 'app-detail-reservation-covoiturage',
  templateUrl: './detail-reservation-covoiturage.component.html',
  styleUrls: ['./detail-reservation-covoiturage.component.css']
})
export class DetailReservationCovoiturageComponent implements OnInit{

  covoiturage!: Covoiturage

  constructor(public dialogRef: MatDialogRef<DetailReservationCovoiturageComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Covoiturage, private reservationCovoiturageService: ReservationCovoiturageService, private router:Router) {
      this.covoiturage = {...data}
     }
  ngOnInit(): void {
    this.dialogRef.getState()
  }  

  onBook(){
    console.log(this.covoiturage)
    this.reservationCovoiturageService.reserverCovoiturage(2, this.covoiturage).pipe(
      tap((bookedCovoiturage) => {
        let updatedResultList =  this.reservationCovoiturageService.listCovoiturageByDateDepart$.value.filter(c => c.id != bookedCovoiturage.id);
        this.reservationCovoiturageService.listCovoiturageByDateDepart$.next(updatedResultList);
        //this.reservationCovoiturageService.listReservationCovoiturage$.value.push(bookedCovoiturage);
      }),
      tap(() => this.router.navigateByUrl('/covoiturage/reservation/list'))
    ).subscribe()
  }

}
