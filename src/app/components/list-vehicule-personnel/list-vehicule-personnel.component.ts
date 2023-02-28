import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

  /** Id du collaborateur connecté */
  collaborateurId? = this.authService.currentCollaborateur?.id;

  /** Liste de véhicules personnels du collaborateur */
  vehiculePersonnelList$ = this.vehiculePersonnelService.vehiculePersonnelListByCollaborateurId$

  constructor(private vehiculePersonnelService: VehiculePersonnelService, private authService:AuthService){}

  /**
   * Fait appel au service de VehiculePersonnel pour récupérer la liste des véhicules personnels en fonction d'un collaborateur.
   */
  ngOnInit(): void {
    this.vehiculePersonnelService.getVehiculePersonnelListByCollaborateurId(this.collaborateurId).subscribe();
  }

  

}
