import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CovoiturageListService } from '../../../core/services/covoiturage-list.service';


@Component({
  selector: 'app-covoiturage-list',
  templateUrl: './covoiturage-list.component.html',
  styleUrls: ['./covoiturage-list.component.css']
})
export class CovoiturageListComponent implements OnInit {

  collaborateurId?= this.authService.currentCollaborateur?.id;

  covoiturageList$ = this._covoiturageService.covoiturageListByOrganisateurId$

  constructor(private _covoiturageService: CovoiturageListService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.collaborateurId) {
      this._covoiturageService.getCovoiturageListByOrganisateurId(this.collaborateurId, 'En-cours').subscribe()
      this._covoiturageService.enCours = true;
    }
  }

  enCours(): void {
    if (this.collaborateurId) {
      this._covoiturageService.getCovoiturageListByOrganisateurId(this.collaborateurId, 'En-cours').subscribe();
      // Comportement à effacer dès que les bons contrôles de dates seront implémentés
      this._covoiturageService.enCours = true;
    }

  }

  historique(): void {
    if (this.collaborateurId) {
      this._covoiturageService.getCovoiturageListByOrganisateurId(this.collaborateurId, 'Historique').subscribe();
      // Comportement à effacer dès que les bons contrôles de dates seront implémentés
      this._covoiturageService.enCours = false;
    }

  }

}
