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

  /**Directive ViewChild donnant accès au composant de filtre par Marque */
  @ViewChild('selectMarque') selectMarque!: MatSelect

  /**Directive ViewChild donnant accès au composant de filtre par Immatriculation */
  @ViewChild('selectImmatriculation') selectImmatriculation!: MatSelect

  vSList$ = this._vehiculeSocieteService.vehiculesSociete$;

  filteredList$= new BehaviorSubject<VehiculeSociete[]>([]);

  allMarques!: (string |undefined )[]

  allImmatriculations!: (string |undefined )[]

  constructor(private _vehiculeSocieteService: VehiculeSocieteService) { };

  ngOnInit() {
    this._vehiculeSocieteService.findAllVehiculeSociete().pipe(tap(() => {
      this.allMarques = this.vSList$.value.map((v) => v.marque)
      this.allImmatriculations = this.vSList$.value.map((v) => v.immatriculation)
      this.filteredList$.next(this.vSList$.value)
    })).subscribe();
    
  }

  // filterOnMarque(marque : string){
  //   if (this.selectMarque.value != null){
  //     this.filteredList$.next(this._vehiculeSocieteService.vehiculesSociete$.value.filter((v) => v.marque === marque));
  //   }
  // }

  // filterOnImmatriculation(immatriculation : string){
  //   if (this.selectImmatriculation.value != null){
  //     this.filteredList$.next(this._vehiculeSocieteService.vehiculesSociete$.value.filter((v) => v.immatriculation === immatriculation));
  //   }
  // }

  filter(){
    this.filteredList$.next(this._vehiculeSocieteService.vehiculesSociete$.value.filter((v) =>{
      if (this.selectImmatriculation.value != null){
        if (v.immatriculation != this.selectImmatriculation.value){
          return false;
        }
      }
      return true;
    })
    .filter((v) => {
      if (this.selectMarque.value != null){
        if (v.marque != this.selectMarque.value){
          return false;
        }
      }
      return true;
    }));
  }

  /**
   * Réinitialisation du/des filtre(s) de recherche
   */
  onReinit(){
    this.selectMarque.value = null
    this.selectImmatriculation.value = null
    this.filteredList$.next(this.vSList$.value)
  }

}
