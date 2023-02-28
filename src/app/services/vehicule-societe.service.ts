import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { VehiculeSociete } from '../models/vehicule-societe';

@Injectable({
  providedIn: 'root'
})
export class VehiculeSocieteService {

  vehiculeSocieteToEdit!: VehiculeSociete

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
    .put<VehiculeSociete>('http://localhost:8080/rest/vehicule-societe', vS);
  }
  
  deleteOne(idVs: number): Observable<VehiculeSociete>{
    return this._http
    .delete<VehiculeSociete>(`http://localhost:8080/rest/vehicule-societe/${idVs}`)
    .pipe(
      tap(() => this.vehiculesSociete$.next(
        this.vehiculesSociete$.value.filter(vS => vS.id != idVs)
      ))
    )
  }

}
