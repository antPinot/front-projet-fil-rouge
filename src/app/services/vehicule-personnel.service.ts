import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { VehiculePersonnel } from '../models/vehicule-personnel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculePersonnelService {

  constructor(private http:HttpClient) { }

  createVehiculePersonnel(vehiculePersonnel : VehiculePersonnel): Observable<VehiculePersonnel>{
    return this.http.post<VehiculePersonnel>('http://localhost:8080/rest/vehicule-personnel', vehiculePersonnel);
  }


}
