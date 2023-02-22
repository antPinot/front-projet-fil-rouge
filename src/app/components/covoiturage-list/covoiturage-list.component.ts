import { Component, Input, OnInit } from '@angular/core';
import { CovoiturageListService } from 'src/app/services/covoiturage-list.service';

@Component({
  selector: 'app-covoiturage-list',
  templateUrl: './covoiturage-list.component.html',
  styleUrls: ['./covoiturage-list.component.css']
})
export class CovoiturageListComponent implements OnInit {



  covoiturageList$ = this._covoiturageService.covoiturageList$; //initialisation de covoiturages$
  
  constructor(private _covoiturageService: CovoiturageListService){}

  ngOnInit(): void {
    this._covoiturageService.getCovoiturageListByCollaborateurId(1).subscribe();
  }

  

}
