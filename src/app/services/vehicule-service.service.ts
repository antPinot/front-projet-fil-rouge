import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VehiculeService } from '../models/vehicule-service';

@Injectable({
  providedIn: 'root'
})
export class VehiculeServiceService {

  constructor(private _http: HttpClient) { }

  //findAll(): Observable<VehiculeService>{
  //  return this._http
  //  .get<VehiculeService[]>()
  //}

  createOne(vS: VehiculeService): Observable<VehiculeService>{
    return this._http
    .post<VehiculeService>('http://localhost:8080/rest/vehicule-service', vS)
  }
}
