import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CovoiturageListService } from 'src/app/core/services/covoiturage-list.service';
import { Covoiturage } from '../../../core/models/covoiturage';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationCovoiturageService } from '../../../core/services/reservation-covoiturage.service';

/**
 * Component gérant l'ouverture d'une boite de dialogue (Dialog de Angular Material)
 * lors de différentes actions : Affichage des détails, Suppression d'une réservation, Confirmation de réservation
 * 
 */
@Component({
  selector: 'app-detail-reservation-covoiturage',
  templateUrl: './detail-reservation-covoiturage.component.html',
  styleUrls: ['./detail-reservation-covoiturage.component.css']
})
export class DetailReservationCovoiturageComponent implements OnInit {

  /** Id du collaborateur connecté */
  collaborateurId?= this.authService.currentCollaborateur?.id;

  /** Covoiturage a réserver, récupéré depuis le component parent (single-covoiturage) */
  covoiturage!: Covoiturage

  /** Booléen permettant de gérer l'affichage du bouton "réserver" */
  reservable!: boolean

  enCours = this.reservationCovoiturageService.enCours

  annonceEnCours = this.covoiturageListService.enCours;
  
  isConsulted = this.reservationCovoiturageService.isConsulted;

  constructor(public dialogRef: MatDialogRef<DetailReservationCovoiturageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Covoiturage, private covoiturageService: CovoiturageListService, private reservationCovoiturageService: ReservationCovoiturageService, private covoiturageListService : CovoiturageListService, private router: Router,
    private authService: AuthService) {
    this.covoiturage = { ...data }
  }

  /** Affecte le booléen reservable en fonction de l'url du component parent*/
  ngOnInit(): void {
    this.router.url == '/covoiturage/reservation/search' ? this.reservable = true : this.reservable = false;
    // console.log(`${!this.reservable}, ${!this.isConsulted}, ${this.enCours},  ${this.annonceEnCours}`)
  }

  /** Méthode de réservation d'un covoiturage */
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

  onDelete() {
    if (this.collaborateurId == this.covoiturage.organisateur?.id) {
      this.covoiturageService.deleteCovoituragePersonnel(this.covoiturage.id).subscribe();
    } else if (this.collaborateurId != this.covoiturage.organisateur?.id && this.collaborateurId) {
      this.reservationCovoiturageService.annulerReservationCovoiturage(this.collaborateurId, this.covoiturage).subscribe()
    }
  }

}
