import { HttpClient } from '@angular/common/http';
import { core } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Adresse } from '../models/adresse';
import { Covoiturage } from '../models/covoiturage';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {

  private _baseUrl = 'http://localhost:8080/rest/covoiturage';

  public covoiturages$= new BehaviorSubject<Covoiturage[]>([]);

  public covoiturage$  = new BehaviorSubject<Covoiturage>({}); ////pour la methode findOne
  
  covoiturageList$: any;

  /**Stockage adresse départ */
  adresseDepart! : Adresse | null;

  /**Stockage adresse arrivée */
  adresseArrivee! : Adresse | null;

  /**Covoiturage à publier ( à envoyer au back-end) */
  covoiturageToPublish! : Covoiturage;

  public covoituragesByVehiculePersonnel$ = new BehaviorSubject<Covoiturage[]>([]);

  /**utiliser httpclient */
  constructor(private _http:HttpClient) {}
  
  /**ici faire les methodes de requetages */
  findAll(): Observable<Covoiturage[]>{
    return this._http
    .get<Covoiturage[]>(this._baseUrl)
    .pipe(
      tap(covoiturages =>this.covoiturages$.next(covoiturages)),
      catchError(error => {
        console.error('Error fetching covoiturages', error);
        return of([]);
      })
    );
  }
  getCovoiturages$(): Observable<Covoiturage[]> {
    return this.covoiturages$.asObservable();
  }
/***/
createOne(covoiturage: Covoiturage): Observable<Covoiturage> {
  return this._http.post<Covoiturage>(this._baseUrl, covoiturage)
  .pipe(tap( (covoitCreate) => {  
   this.covoiturages$.next( [ covoitCreate, ...this.covoiturages$.value] )
   
   /* dans le tableau todos$ avec next() je lui passe la variable dans un nouveau tableau*/ 
  }))
 }

 publish(covoiturage: Covoiturage): Observable<Covoiturage>{
  return this._http.post<Covoiturage>(this._baseUrl, covoiturage);
 }


  /**findById */
  findById(id:string): Observable<Covoiturage>{
    return this._http.get<Covoiturage>(`${this._baseUrl}/${id}`)
    .pipe(
      tap(covoiturage => this.covoiturage$.next(covoiturage))
    )
  }


  /**editOne */
  editOne(covoiturage: Covoiturage): Observable<Covoiturage>{
    return this._http.put<Covoiturage>(`${this._baseUrl}/${covoiturage.id}`, covoiturage)
    .pipe(
      tap(
        uptadecovoit => {
          const covoits = this.covoiturages$.value;
          const index = covoits.findIndex(t => t.id === uptadecovoit.id);
          if(index !== -1){
            covoits[index] = uptadecovoit;
            this.covoiturages$.next(covoits);
          }
        })
    );
  }


  /** deleteOne */
  deleteOne(id:number): Observable<Covoiturage>{
    return this._http.delete<Covoiturage>(`${this._baseUrl}/${id}`).pipe(
      tap(deleteCovoit => {
        const covoits = this.covoiturages$.value;
        const index = covoits.findIndex(t => t.id === deleteCovoit.id);
        if(index !== -1){
          covoits[index] = deleteCovoit;
          this.covoiturages$.next(covoits);
        }
      })
    );
  }

  getCovoituragesEnCoursByVehiculePersonnelId(vehiculePersonnelId:string): Observable<Covoiturage[]>{
    return this._http.get<Covoiturage[]>(`${this._baseUrl}/vehicule-personnel?vehiculePersonnelId=${vehiculePersonnelId}`).pipe(
      tap((covoiturages) => this.covoituragesByVehiculePersonnel$.next(covoiturages))
    )
  }



}

