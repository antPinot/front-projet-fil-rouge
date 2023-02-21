import { Component, OnInit } from '@angular/core';
import { VehiculePersonnelService } from 'src/app/services/vehicule-personnel.service';

@Component({
  selector: 'app-list-vehicule-personnel',
  templateUrl: './list-vehicule-personnel.component.html',
  styleUrls: ['./list-vehicule-personnel.component.css']
})
export class ListVehiculePersonnelComponent implements OnInit{

  vehiculePersonnelList$ = this.vehiculePersonnelService.vehiculePersonnelListByCollaborateurId$

  constructor(private vehiculePersonnelService: VehiculePersonnelService){}

  ngOnInit(): void {
    this.vehiculePersonnelService.getVehiculePersonnelListByCollaborateurId(1).subscribe();
  }


}
