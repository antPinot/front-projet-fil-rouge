import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { VehiculePersonnel } from '../models/vehicule-personnel';
import { BehaviorSubject, Observable, tap } from 'rxjs';

/**
 * 
 * Méthodes de services CRUD requêtant l'API exposée par 
 * Spring Boot pour les véhicules personnels
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class VehiculePersonnelService {

  vehiculePersonnelListByCollaborateurId$ = new BehaviorSubject<VehiculePersonnel[]>([])

  constructor(private http:HttpClient) { }

  /**
   * Requête POST de création d'un véhicule personnel
   * 
   * @param vehiculePersonnel Véhicule personnel à créer
   * @returns 
   */
  createVehiculePersonnel(vehiculePersonnel : VehiculePersonnel): Observable<VehiculePersonnel>{
    return this.http.post<VehiculePersonnel>('http://localhost:8080/rest/vehicule-personnel', vehiculePersonnel);
  }

  /**
   * Requête GET de recherche d'un véhicule personnel
   * 
   * @param collaborateurId 
   * @returns 
   */
  getVehiculePersonnelListByCollaborateurId(collaborateurId : number): Observable<VehiculePersonnel[]>{
    return this.http.get<VehiculePersonnel[]>(`http://localhost:8080/rest/vehicule-personnel/collaborateur/${collaborateurId}`).pipe(
      tap((vehiculePersonnel) => this.vehiculePersonnelListByCollaborateurId$.next(vehiculePersonnel)));
  }

  /**
   * Requête DELETE de suppression d'un véhicule personnel
   * 
   * @param vehiculePersonnelId 
   * @returns 
   */
  deleteVehiculePersonnel(vehiculePersonnelId: number): Observable<VehiculePersonnel>{
    return this.http.delete<VehiculePersonnel>(`http://localhost:8080/rest/vehicule-personnel/${vehiculePersonnelId}`).pipe(
      tap(() => this.vehiculePersonnelListByCollaborateurId$.next(
        this.vehiculePersonnelListByCollaborateurId$.value.filter(v => v.id != vehiculePersonnelId)
      ))
    )
  }


}
