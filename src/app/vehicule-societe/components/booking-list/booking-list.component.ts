import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationVehiculeService } from 'src/app/core/services/reservation-vehicule.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit{

  reservationsVehicule = this.reservationVehiculeService.listReservationVehiculeAdmin$.value

  displayedColumns: string[] = ['no', 'dateDebut', 'dateFin', 'responsable'];

  constructor(private _activatedRoute: ActivatedRoute, private reservationVehiculeService: ReservationVehiculeService){
  }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe((paramMap) => {
      let vehiculeSocieteId: string = paramMap.get('id') as string;
      this.reservationVehiculeService.findReservationVehiculeSocieteByVehiculeId(vehiculeSocieteId).subscribe()
    });
  }

}
