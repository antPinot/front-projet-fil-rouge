import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry, Point } from 'geojson';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Adresse } from '../models/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private _baseUrl = 'http://localhost:8080/rest/adresse';

  private _osrmBaseUrl = 'http://router.project-osrm.org/route/v1/driving/';

  private _photonBaseUrl = 'https://photon.komoot.io/api/'

  /**Bounding box autour de la France pour limiter les résultats d'autocomplétion */
  private _frenchBbox = '-5.56,42.2,8.53,51.1';

  public adresses$ = new BehaviorSubject<Adresse[]>([]);

  public adresse$ = new BehaviorSubject<Adresse>({}); ////pour la methode findOne

  public listAdressesForAutocompleteDepart$ = new BehaviorSubject<Adresse[]>([]);

  public listAdressesForAutocompleteArrivee$ = new BehaviorSubject<Adresse[]>([]);

  public departCoordinates$ = new BehaviorSubject<Point>({ type: 'Point', coordinates: [] })

  public arriveeCoordinates$ = new BehaviorSubject<Point>({ type: 'Point', coordinates: [] })

  /**Durée du trajet en minutes */
  public routeDuration$ = new BehaviorSubject<number>(0);

  /**Distance du trajet en km */
  public routeDistance$ = new BehaviorSubject<number>(0);

  public routeDrawing$ = new BehaviorSubject<any>({});

  public zoom = 13;

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

  // findByUserQuery(userQuery: string | unknown): Observable<Adresse[]> {
  //   return this._http.get<Adresse[]>(`${this._baseUrl}/autocomplete?userQuery=${userQuery}`).pipe(
  //     tap((adressesResult) => this.listAdressesForAutocomplete$.next(adressesResult))
  //   );
  // }

  /**
   * Méthode d'appel à l'API externe Photon pour l'autocomplétion basée sur l'API OpenStreetMap
   * (+ Récupération des coordonnées GPS de l'adresse pour pointer sur la carte leaflet)
   * 
   * @param userQuery 
   * @returns 
   */
  findByUserQueryWithPhotonAPI(userQuery: string | unknown, depart: boolean): Observable<FeatureCollection<Geometry, GeoJsonProperties>> {
    return this._http.get<FeatureCollection>(`${this._photonBaseUrl}?q=${userQuery}&bbox=${this._frenchBbox}`).pipe(
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
          if (singleResult.geometry.type === 'Point') {
            let coordinates: Point = {
              type: 'Point',
              coordinates: [singleResult.geometry?.['coordinates'][0], singleResult.geometry?.['coordinates'][1]]
            };
            depart ? this.departCoordinates$.next(coordinates) : this.arriveeCoordinates$.next(coordinates)
          }
        })

        depart ? this.listAdressesForAutocompleteDepart$.next(adressesResults) : this.listAdressesForAutocompleteArrivee$.next(adressesResults);
      }))
  }

  calculateRoute(adresses: Point[]): Observable<any> {
    let adresseDepart: string = `${adresses[0].coordinates[0].toString()},${adresses[0].coordinates[1].toString()}`;
    let adresseArrivee: string = `${adresses[1].coordinates[0].toString()},${adresses[1].coordinates[1].toString()}`;
    return this._http.get<any>(`${this._osrmBaseUrl}${adresseDepart};${adresseArrivee}?overview=full`).pipe(
      tap((osrmResult) => {
          console.log(`${this._osrmBaseUrl}${adresseDepart};${adresseArrivee}?overview=full`)
          var polyline = require('@mapbox/polyline');
          let geometry: Geometry = osrmResult['routes'][0]['geometry'];
          this.routeDrawing$.next(polyline.decode(geometry));
          let durationInMinutes: number = Math.ceil(parseFloat(osrmResult['routes'][0]['duration']) / 60.00);
          let distanceInKm: number = Math.ceil(parseFloat(osrmResult['routes'][0]['distance']) / 1000.00);
          this.routeDuration$.next(durationInMinutes);
          this.routeDistance$.next(distanceInKm);

      })
    );
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

  displayAdresse(adresse: Adresse): string {
    if (adresse !== null) {
      let complementNum: boolean;
      adresse.complementNumero ? complementNum = true : complementNum = false;
      return complementNum ? `${adresse.numero} ${adresse.complementNumero} ${adresse.voie} ${adresse.codePostal} ${adresse.ville} ${adresse.departement} ${adresse.pays} ` : `${adresse.numero} ${adresse.voie} ${adresse.codePostal} ${adresse.ville} ${adresse.departement} ${adresse.pays} `
    }
    return '';
  }

}


