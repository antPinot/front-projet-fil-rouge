import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Covoiturage } from '../models/covoiturage';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageListService {


  private _baseUrl = 'http://localhost:8080/rest/covoiturage-list';  

  covoiturageListByCollaborateurId$ = new BehaviorSubject<Covoiturage[]>([])
  covoiturageList$: any;

  constructor(private http:HttpClient) { }



  
  /**
   * Requête GET de recherche d'un véhicule personnel
   * 
   * @param collaborateurId 
   * @returns 
   */
  getCovoiturageListByCollaborateurId(collaborateurId : number): Observable<Covoiturage[]>{
    return this.http.get<Covoiturage[]>(`http://localhost:8080/rest/covoiturage-list/collaborateur/${collaborateurId}`).pipe(
      tap((covoituragePersonnel: Covoiturage[]) => this.covoiturageListByCollaborateurId$.next(covoituragePersonnel)));
  }

  /**
   * Requête DELETE de suppression d'un véhicule personnel
   * 
   * @param vehiculePersonnelId 
   * @returns 
   */
  deleteCovoituragePersonnel(covoituragePersonnelId: number): Observable<Covoiturage>{
    return this.http.delete<Covoiturage>(`http://localhost:8080/rest/covoiturage-list/${covoituragePersonnelId}`).pipe(
      tap(() => this.covoiturageListByCollaborateurId$.next(
        this.covoiturageListByCollaborateurId$.value.filter(v => v.id != covoituragePersonnelId)
      ))
    )
  }

}
