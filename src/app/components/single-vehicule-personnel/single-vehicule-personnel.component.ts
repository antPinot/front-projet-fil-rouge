import { Component, Input, OnInit } from '@angular/core';
import { VehiculePersonnel } from 'src/app/models/vehicule-personnel';
import { VehiculePersonnelService } from 'src/app/services/vehicule-personnel.service';

@Component({
  selector: 'app-single-vehicule-personnel',
  templateUrl: './single-vehicule-personnel.component.html',
  styleUrls: ['./single-vehicule-personnel.component.css']
})
export class SingleVehiculePersonnelComponent {

  constructor(private vehiculePersonnelService: VehiculePersonnelService) { }

  @Input()
  vehiculePersonnel!: VehiculePersonnel

  onDelete(vehiculePersonnelId?: number) {
    if (vehiculePersonnelId) {
      this.vehiculePersonnelService.deleteVehiculePersonnel(vehiculePersonnelId).subscribe();
    }
  }

}
