import { Component, Input } from '@angular/core';
import { VehiculeSociete } from 'src/app/models/vehicule-societe';
import { VehiculeSocieteService } from 'src/app/services/vehicule-societe.service';

@Component({
  selector: 'app-single-vehicule-societe',
  templateUrl: './single-vehicule-societe.component.html',
  styleUrls: ['./single-vehicule-societe.component.css']
})
export class SingleVehiculeSocieteComponent {

  constructor(private _vehiculeSocieteService: VehiculeSocieteService) { }

  @Input()
  vehiculeSociete!: VehiculeSociete

  onEdit(vehiculeSociete: VehiculeSociete){
    if(vehiculeSociete.id){
      this._vehiculeSocieteService.editOne(vehiculeSociete).subscribe();
    }
  }

  onDelete(vehiculeSociete: VehiculeSociete) {
    if (vehiculeSociete.id) {
      this._vehiculeSocieteService.deleteOne(vehiculeSociete).subscribe();
    }
  }

}
