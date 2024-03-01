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

  /**
   * Requête de recherche pour l'ensemble des véhicules de société
   */
  findAllVehiculeSociete(): Observable<VehiculeSociete[]>{
    return this._http.get<VehiculeSociete[]>(`http://localhost:8080/rest/vehicule-societe`).pipe(
      tap((vehiculeSociete) => this.vehiculesSociete$.next(vehiculeSociete)));
  }

  /**
   * Requête de création pour un véhicule de société
   */
  createOne(vS: VehiculeSociete): Observable<VehiculeSociete>{
    return this._http
    .post<VehiculeSociete>('http://localhost:8080/rest/vehicule-societe/createVehiculeSociete', vS)
  }

  /**
   * Requête de modification pour un véhicule de société
   */
  editOne(vS: VehiculeSociete): Observable<VehiculeSociete>{
    return this._http
    .put<VehiculeSociete>('http://localhost:8080/rest/vehicule-societe', vS);
  }
  

   /**
   * Requête de suppression pour un véhicule de société
   */
  deleteOne(idVs: number): Observable<VehiculeSociete>{
    return this._http
    .delete<VehiculeSociete>(`http://localhost:8080/rest/vehicule-societe/${idVs}`)
    .pipe(
      tap(() => this.vehiculesSociete$.next(
        this.vehiculesSociete$.value.filter(vS => vS.id != idVs)
      ))
    )
  }

  getAllCategories(): Observable<String[]>{
    return this._http.get<String[]>('http://localhost:8080/rest/vehicule-societe/categories');
  }

  findCategorieNameByCategorie(categorie: string | undefined): any{
    return this._http.get(`http://localhost:8080/rest/vehicule-societe/categorie?categorie=${categorie}`, {responseType: 'text'});
  }

}
