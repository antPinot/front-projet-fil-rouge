import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Covoiturage } from '../models/covoiturage';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageListService {


  private _baseUrl = 'http://localhost:8080/rest/covoiturage-list';  

  covoiturageListByOrganisateurId$ = new BehaviorSubject<Covoiturage[]>([]);
  enCours!: boolean;
  

  constructor(private http:HttpClient) { }



  
  /**
   * Requête GET de recherche d'un véhicule personnel
   * 
   * @param collaborateurId 
   * @returns 
   */
  getCovoiturageListByOrganisateurId(organisateurId : number, statut: string): Observable<Covoiturage[]>{
    return this.http.get<Covoiturage[]>(`http://localhost:8080/rest/covoiturage/annonces/${organisateurId}?statut=${statut}`).pipe(
      tap((covoituragePersonnel: Covoiturage[]) => this.covoiturageListByOrganisateurId$.next(covoituragePersonnel)));
  }

  /**
   * Requête DELETE de suppression d'un véhicule personnel
   * 
   * @param vehiculePersonnelId 
   * @returns 
   */
  deleteCovoituragePersonnel(covoituragePersonnelId: number): Observable<Covoiturage>{
    return this.http.delete<Covoiturage>(`http://localhost:8080/rest/covoiturage/${covoituragePersonnelId}`).pipe(
      tap(() => this.covoiturageListByOrganisateurId$.next(
        this.covoiturageListByOrganisateurId$.value.filter(c => c.id != covoituragePersonnelId)
      ))
    )
  }

}
