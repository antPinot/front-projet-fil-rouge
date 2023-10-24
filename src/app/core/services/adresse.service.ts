import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, FeatureCollection } from 'geojson';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Adresse } from '../models/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {


  private _baseUrl = 'http://localhost:8080/rest/adresse';

  public adresses$ = new BehaviorSubject<Adresse[]>([]);

  public adresse$ = new BehaviorSubject<Adresse>({}); ////pour la methode findOne

  public listAdressesForAutocomplete$ = new BehaviorSubject<Adresse[]>([]);

  constructor(private _http: HttpClient) { }


  /**ici faire les methodes de requetages */

  findAll(): Observable<Adresse[]> {
    return this._http
      .get<Adresse[]>(this._baseUrl)
      .pipe(
        tap(adresses => this.adresses$.next(adresses)),
        catchError(error => {
          console.error('Error fetching todos', error);
          return of([]);
        }),
      )
  };

  findByUserQuery(userQuery: string | unknown): Observable<Adresse[]> {
    return this._http.get<Adresse[]>(`${this._baseUrl}/autocomplete?userQuery=${userQuery}`).pipe(
      tap((adressesResult) => this.listAdressesForAutocomplete$.next(adressesResult))
    );
  }

  /**
   * Méthode d'appel à l'API externe Photon pour l'autocomplétion basée sur l'API OpenStreetMap
   * 
   * @param userQuery 
   * @returns 
   */
  findByUserQueryWithPhotonAPI(userQuery: string | unknown): Observable<Adresse[]> {
    this._http.get<FeatureCollection>(`https://photon.komoot.io/api/?q=${userQuery}`).pipe(
      tap((photonResultsGEOJSON: FeatureCollection) => {
        let adressesResults: Adresse[] = [];
        photonResultsGEOJSON.features.forEach((singleResult: Feature) => {
          let adresse: Adresse = {
            numero: singleResult.properties?.['housenumber'],
            voie: singleResult.properties?.['street'],
            codePostal: singleResult.properties?.['postcode'],
            ville: singleResult.properties?.['city'],
            departement: singleResult.properties?.['county'],
            pays: singleResult.properties?.['country']
          };
          adressesResults.push(adresse);
        })
        this.listAdressesForAutocomplete$.next(adressesResults)
      })).subscribe();
    return this.listAdressesForAutocomplete$;
  }


  createOne(adresse: Adresse): Observable<Adresse> {
    return this._http.post<Adresse>(this._baseUrl, adresse)
      .pipe(tap((adresseCreate) => {
        this.adresses$.next([adresseCreate, ...this.adresses$.value])
      }))

  }


  /**findById */
  findById(id: string): Observable<Adresse> {
    return this._http.get<Adresse>(`${this._baseUrl}/${id}`)
      .pipe(
        tap(adresse => this.adresse$.next(adresse))
      )
  }


  /**editOne */
  editOne(adresse: Adresse): Observable<Adresse> {
    return this._http.put<Adresse>(`${this._baseUrl}/${adresse.id}`, adresse)
      .pipe(
        tap(
          uptadeAdress => {
            const adress = this.adresses$.value;
            const index = adress.findIndex(t => t.id === uptadeAdress.id);
            if (index !== -1) {
              adress[index] = uptadeAdress;
              this.adresses$.next(adress);
            }
          })
      );
  }



  /** deleteOne */
  deleteOne(id: string): Observable<Adresse> {
    return this._http.delete<Adresse>(`${this._baseUrl}/${id}`).pipe(
      tap(deleteAdress => {
        const adress = this.adresses$.value;
        const index = adress.findIndex(t => t.id === deleteAdress.id);
        if (index !== -1) {
          adress[index] = deleteAdress;
          this.adresses$.next(adress);
        }
      })
    );
  }



}


