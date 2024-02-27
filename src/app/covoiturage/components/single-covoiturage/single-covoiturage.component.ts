import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailReservationCovoiturageComponent } from 'src/app/reservation-covoiturage/components/detail-reservation-covoiturage/detail-reservation-covoiturage.component';
import { Covoiturage } from '../../../core/models/covoiturage';
import { CovoiturageService } from '../../../core/services/covoiturage.service';

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


  constructor(private covoiturageService: CovoiturageService, private dialog: MatDialog) { }


  @Input()
  covoituragePersonnel!: Covoiturage


  ngOnInit(): void {
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
