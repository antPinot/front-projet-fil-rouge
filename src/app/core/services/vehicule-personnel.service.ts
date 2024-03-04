import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { VehiculePersonnel } from '../models/vehicule-personnel';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CovoiturageService } from './covoiturage.service';

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

  /** Véhicule personnel à modifier */
  vehiculePersonnelToEdit!: VehiculePersonnel

  /** Liste des véhicules personnels d'un collaborateur */
  vehiculePersonnelListByCollaborateurId$ = new BehaviorSubject<VehiculePersonnel[]>([])

  constructor(private http: HttpClient, private covoiturageService:CovoiturageService) { }

  /**
   * Requête POST de création d'un véhicule personnel du collaborateur connecté
   * 
   * @param vehiculePersonnel Véhicule personnel à créer
   * @returns 
   */
  createVehiculePersonnel(vehiculePersonnel: VehiculePersonnel): Observable<VehiculePersonnel> {
    return this.http.post<VehiculePersonnel>('http://localhost:8080/rest/vehicule-personnel', vehiculePersonnel).pipe(
      tap((vehiculeToCreate) => console.log(vehiculeToCreate))
    );
  }

  /**
   * Requête PUT de modification d'un véhicule personnel
   * 
   * @param vehiculePersonnel Véhicule personnel à modifier
   * @returns 
   */
  editVehiculePersonnel(vehiculePersonnel: VehiculePersonnel): Observable<VehiculePersonnel> {
    return this.http.put<VehiculePersonnel>('http://localhost:8080/rest/vehicule-personnel', vehiculePersonnel);
  }

  /**
   * Requête GET récupérant la liste des véhicules personnels d'un collaborateur connecté
   * 
   * @param collaborateurId en fonction de l'Id du collaborateur connecté
   * @returns 
   */
  getVehiculePersonnelListByCollaborateurId(collaborateurId?: number | undefined): Observable<VehiculePersonnel[]> {
    return this.http.get<VehiculePersonnel[]>(`http://localhost:8080/rest/vehicule-personnel/collaborateur/${collaborateurId}`).pipe(
      tap((vehiculePersonnel) => this.vehiculePersonnelListByCollaborateurId$.next(vehiculePersonnel)));
  }

  checkVehiculePersonnelInCovoiturage(): boolean{
    let isInCovoiturage: boolean = false;
    this.covoiturageService.covoituragesByVehiculePersonnel$.value.length > 0 ? isInCovoiturage = true : isInCovoiturage = false
    return isInCovoiturage
  }

  /**
   * Requête DELETE de suppression d'un véhicule personnel du collaborateur connecté
   * 
   * @param vehiculePersonnelId en fonction de l'Id du véhicule personnel à supprimer
   * @returns 
   */
  deleteVehiculePersonnel(vehiculePersonnelId: number | undefined): Observable<VehiculePersonnel> {
    return this.http.delete<VehiculePersonnel>(`http://localhost:8080/rest/vehicule-personnel/${vehiculePersonnelId}`).pipe(
      tap(() => this.vehiculePersonnelListByCollaborateurId$.next(
        this.vehiculePersonnelListByCollaborateurId$.value.filter(v => v.id != vehiculePersonnelId)
      ))
    )
  }


}
