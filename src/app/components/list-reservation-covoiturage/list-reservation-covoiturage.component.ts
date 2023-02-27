import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';

@Component({
  selector: 'app-list-reservation-covoiturage',
  templateUrl: './list-reservation-covoiturage.component.html',
  styleUrls: ['./list-reservation-covoiturage.component.css']
})
export class ListReservationCovoiturageComponent implements OnInit{

  collaborateurId?= this.authService.currentCollaborateur?.id;

  listReservationCovoiturage$ = this.reservationCovoiturageService.listReservationCovoiturage$;

  //isEmpty = this.listReservationCovoiturage$.value.length == 0;

  constructor(private reservationCovoiturageService: ReservationCovoiturageService, private authService: AuthService) { }
  ngOnInit(): void {
    this.enCours();
  }

  enCours(): void {
    if (this.collaborateurId) {
      this.reservationCovoiturageService.getListReservationCovoiturageByCollaborateur(this.collaborateurId, 'en-cours').subscribe();
      // Comportement à effacer dès que les bons contrôles de dates seront implémentés
      this.reservationCovoiturageService.enCours = true;
    }

  }

  historique(): void {
    if (this.collaborateurId) {
      this.reservationCovoiturageService.getListReservationCovoiturageByCollaborateur(this.collaborateurId, 'historique').subscribe();
      // Comportement à effacer dès que les bons contrôles de dates seront implémentés
      this.reservationCovoiturageService.enCours = false;
    }


  }

}
