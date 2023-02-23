import { Component, OnInit } from '@angular/core';
import { VehiculePersonnelService } from 'src/app/services/vehicule-personnel.service';

/**
 * Component permettant d'afficher la liste des véhicules 
 * personnels
 * 
 */
@Component({
  selector: 'app-list-vehicule-personnel',
  templateUrl: './list-vehicule-personnel.component.html',
  styleUrls: ['./list-vehicule-personnel.component.css']
})
export class ListVehiculePersonnelComponent implements OnInit{

  vehiculePersonnelList$ = this.vehiculePersonnelService.vehiculePersonnelListByCollaborateurId$

  constructor(private vehiculePersonnelService: VehiculePersonnelService){}

  /**
   * Fait appel au service de VehiculePersonnel pour récupérer la liste des véhicules personnels en fonction d'en collaborateur.
   */
  ngOnInit(): void {
    this.vehiculePersonnelService.getVehiculePersonnelListByCollaborateurId(1).subscribe();
  }


}
