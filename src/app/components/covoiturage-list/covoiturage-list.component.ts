import { Component, Input, OnInit } from '@angular/core';
import { CovoiturageListService } from 'src/app/services/covoiturage-list.service';
import { CovoiturageService } from 'src/app/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-list',
  templateUrl: './covoiturage-list.component.html',
  styleUrls: ['./covoiturage-list.component.css']
})
export class CovoiturageListComponent implements OnInit {

  covoiturageList$ = this._covoiturageService.covoiturageListByOrganisateurId$
  
  constructor(private _covoiturageService: CovoiturageListService){}


  enCours(): void {
    this._covoiturageService.getCovoiturageListByOrganisateurId(2,'En-cours').subscribe();
    // Comportement à effacer dès que les bons contrôles de dates seront implémentés
    this._covoiturageService.enCours = true;
  }

  historique(): void {
    this._covoiturageService.getCovoiturageListByOrganisateurId(2,'Historique').subscribe();
    // Comportement à effacer dès que les bons contrôles de dates seront implémentés
    this._covoiturageService.enCours = false;

  }

  ngOnInit(): void {
    this._covoiturageService.getCovoiturageListByOrganisateurId(1, 'Historique').subscribe()
    
  }

  

}
