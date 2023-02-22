import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Covoiturage } from 'src/app/models/covoiturage';

@Component({
  selector: 'app-detail-reservation-covoiturage',
  templateUrl: './detail-reservation-covoiturage.component.html',
  styleUrls: ['./detail-reservation-covoiturage.component.css']
})
export class DetailReservationCovoiturageComponent {

  constructor(public dialogRef: MatDialogRef<DetailReservationCovoiturageComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Covoiturage) { }

  
}
