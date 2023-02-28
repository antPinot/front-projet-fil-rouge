import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculePersonnel } from 'src/app/models/vehicule-personnel';
import { VehiculePersonnelService } from 'src/app/services/vehicule-personnel.service';

/**
 * Component permettant l'affichage d'un véhicule personnel
 * individuel
 * 
 */
@Component({
  selector: 'app-single-vehicule-personnel',
  templateUrl: './single-vehicule-personnel.component.html',
  styleUrls: ['./single-vehicule-personnel.component.css']
})
export class SingleVehiculePersonnelComponent implements OnInit{

  constructor(private vehiculePersonnelService: VehiculePersonnelService, private router:Router) { }

  @Input()
  vehiculePersonnel!: VehiculePersonnel

  ngOnInit(): void {
    console.log(this.vehiculePersonnel);
  }



  /**
   * Méthode de suppression d'un véhicule 
   * déclenchée lors de l'évènement click sur le bouton de suppression
   * 
   * @param vehiculePersonnelId Id du véhicule à supprimer
   */
  onDelete(vehiculePersonnelId?: number) {
    if (vehiculePersonnelId) {
      this.vehiculePersonnelService.deleteVehiculePersonnel(vehiculePersonnelId).subscribe();
    }
  }

  onEdit(){
    this.vehiculePersonnelService.vehiculePersonnelToEdit = this.vehiculePersonnel;
    this.router.navigateByUrl('vehicule-personnel/edit');
  }

}
