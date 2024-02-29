import { Component, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, filter, map, tap } from 'rxjs';
import { VehiculeSociete } from 'src/app/core/models/vehicule-societe';
import { VehiculeSocieteService } from '../../../core/services/vehicule-societe.service';

@Component({
  selector: 'app-list-vehicule-societe',
  templateUrl: './list-vehicule-societe.component.html',
  styleUrls: ['./list-vehicule-societe.component.css']
})
export class ListVehiculeSocieteComponent {

  @ViewChild('selectMarque') selectMarque!: MatSelect

  vSList$ = this._vehiculeSocieteService.vehiculesSociete$;

  filteredList$= new BehaviorSubject<VehiculeSociete[]>([]);

  allMarques!: (string |undefined )[]

  constructor(private _vehiculeSocieteService: VehiculeSocieteService) { };

  ngOnInit() {
    this._vehiculeSocieteService.findAllVehiculeSociete().pipe(tap(() => {
      this.allMarques = this.vSList$.value.map((v) => v.marque)
      this.filteredList$.next(this.vSList$.value)
    })).subscribe();
    
  }

  filterOnMarque(marque : string){
    if (this.selectMarque.value != null){
      this.filteredList$.next(this._vehiculeSocieteService.vehiculesSociete$.value.filter((v) => v.marque === marque));
    }
  }

  onReinit(){
    this.selectMarque.value = null
    this.filteredList$.next(this.vSList$.value)
  }

}
