import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailReservationCovoiturageComponent } from 'src/app/reservation-covoiturage/components/detail-reservation-covoiturage/detail-reservation-covoiturage.component';
import { Covoiturage } from '../../../core/models/covoiturage';
import { CovoiturageService } from '../../../core/services/covoiturage.service';
import { CovoiturageListService } from 'src/app/core/services/covoiturage-list.service';
import { ReservationCovoiturageService } from 'src/app/core/services/reservation-covoiturage.service';

@Component({
  selector: 'app-single-covoiturage',
  templateUrl: './single-covoiturage.component.html',
  styleUrls: ['./single-covoiturage.component.css']
})

/**
 * Component permettant l'affichage d'un covoiturage
 * individuel
 * 
 */
export class SingleCovoiturageComponent {

  hasPeople!: boolean

  enCours : boolean = this.covoiturageListService.enCours;

  constructor(private covoiturageService: CovoiturageService, private dialog: MatDialog, private covoiturageListService : CovoiturageListService, private reservationCovoiturageService:ReservationCovoiturageService) { }


  @Input()
  covoituragePersonnel!: Covoiturage


  ngOnInit(): void {
    /**S'il y a plus d'un passager (i.e. s'il y a d'autres passagers hormis le conducteur) il n'est plus possible de modifier le covoiturage*/
    if (this.covoituragePersonnel.collaborateurs != null){
      this.covoituragePersonnel.collaborateurs?.length > 0 ? this.hasPeople = true: this.hasPeople = false
    }
  }


  /**
   * Ouvre la fenêtre de détails 
   */
  displayDetails() {
    this.dialog.open(DetailReservationCovoiturageComponent, {
      height: '400px', width: '700px', data:
      {
        id: this.covoituragePersonnel.id,
        dateDepart: this.covoituragePersonnel.dateDepart,
        adresseDepart: this.covoituragePersonnel.adresseDepart,
        adresseArrivee: this.covoituragePersonnel.adresseArrivee,
        placesRestantes: this.covoituragePersonnel.placesRestantes,
        nbPersonnes: this.covoituragePersonnel.nbPersonnes,
        dureeTrajet: this.covoituragePersonnel.dureeTrajet,
        distance: this.covoituragePersonnel.distance,
        organisateur: this.covoituragePersonnel.organisateur,
        vehiculePersonnel: this.covoituragePersonnel.vehiculePersonnel,
        collaborateurs: this.covoituragePersonnel.collaborateurs
      }
    });
  }

  displayDetailsForConsulting(){
    this.reservationCovoiturageService.isConsulted = true;
    this.displayDetails()
  }

  displayDetailsForCancel(){
    this.reservationCovoiturageService.isConsulted = false;
    this.displayDetails()
  }

  /**
   * 
   * @param covoiturage 
   */
  editerCovoiturage(covoiturage: Covoiturage) {
    if (covoiturage.id) {
      this.covoiturageService.editOne(covoiturage.id).subscribe();
    }
  }

}
