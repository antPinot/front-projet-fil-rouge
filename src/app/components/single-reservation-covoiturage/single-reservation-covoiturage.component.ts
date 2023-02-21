import { Component, Input } from '@angular/core';
import { Covoiturage } from 'src/app/models/covoiturage';

@Component({
  selector: 'app-single-reservation-covoiturage',
  templateUrl: './single-reservation-covoiturage.component.html',
  styleUrls: ['./single-reservation-covoiturage.component.css']
})
export class SingleReservationCovoiturageComponent {

  @Input()
  reservationCovoiturage!: Covoiturage

  displayDetails(covoiturage:Covoiturage){
    
  }

}
