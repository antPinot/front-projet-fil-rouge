import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationCovoiturageService } from 'src/app/services/reservation-covoiturage.service';

@Component({
  selector: 'app-list-reservation-covoiturage',
  templateUrl: './list-reservation-covoiturage.component.html',
  styleUrls: ['./list-reservation-covoiturage.component.css']
})
export class ListReservationCovoiturageComponent {

  collaborateurId?= this.authService.currentCollaborateur?.id;

  listReservationCovoiturage$ = this.reservationCovoiturageService.listReservationCovoiturage$;

  constructor(private reservationCovoiturageService: ReservationCovoiturageService, private authService: AuthService) { }

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
