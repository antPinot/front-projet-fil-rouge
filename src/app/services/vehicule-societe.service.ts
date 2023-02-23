import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { VehiculeSociete } from '../models/vehicule-societe';

@Injectable({
  providedIn: 'root'
})
export class VehiculeSocieteService {

  public vehiculesSociete$= new BehaviorSubject<VehiculeSociete[]>([]);

  constructor(private _http: HttpClient) { }

  findAllVehiculeSociete(): Observable<VehiculeSociete[]>{
    return this._http.get<VehiculeSociete[]>(`http://localhost:8080/rest/vehicule-societe`).pipe(
      tap((vehiculeSociete) => this.vehiculesSociete$.next(vehiculeSociete)));
  }

  createOne(vS: VehiculeSociete): Observable<VehiculeSociete>{
    return this._http
    .post<VehiculeSociete>('http://localhost:8080/rest/vehicule-societe', vS)
  }

  editOne(vS: VehiculeSociete): Observable<VehiculeSociete>{
    return this._http
    .put<VehiculeSociete>(`'http://localhost:8080/rest/vehicule-societe'/${vS.id}`, vS)
    .pipe(
      tap( vehiculeSocieteToUpdate => {
          const vehiculesSociete = this.vehiculesSociete$.value;
          const id = vehiculesSociete.findIndex(t => t.id === vehiculeSocieteToUpdate.id);
          if(id !== -1){
            vehiculesSociete[id] = vehiculeSocieteToUpdate;
            this.vehiculesSociete$.next(vehiculesSociete);
          }
        })
    );
  }

  deleteOne(vS: VehiculeSociete): Observable<VehiculeSociete>{
    return this._http
    .delete<VehiculeSociete>(`'http://localhost:8080/rest/vehicule-societe'/${vS.id}`)
    .pipe(
      tap( vehiculeSocieteToDelete => {
        const vehiculesSociete = this.vehiculesSociete$.value;
        const index = vehiculesSociete.findIndex(t => t.id === vehiculeSocieteToDelete.id);
        if(index !== -1){
          vehiculesSociete[index] = vehiculeSocieteToDelete;
          this.vehiculesSociete$.next(vehiculesSociete);
        }
      })
    );
  }

}
