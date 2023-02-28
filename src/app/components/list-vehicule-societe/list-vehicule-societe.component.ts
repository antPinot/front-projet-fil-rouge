import { Component } from '@angular/core';
import { VehiculeSocieteService } from 'src/app/services/vehicule-societe.service';

@Component({
  selector: 'app-list-vehicule-societe',
  templateUrl: './list-vehicule-societe.component.html',
  styleUrls: ['./list-vehicule-societe.component.css']
})
export class ListVehiculeSocieteComponent {

  vSList$ = this._vehiculeSocieteService.vehiculesSociete$;

  constructor(private _vehiculeSocieteService: VehiculeSocieteService) { };

  ngOnInit() {
    this._vehiculeSocieteService.findAllVehiculeSociete().subscribe();
  }

}
