import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ReservationVehiculeSociete } from '../models/reservationVehiculeSociete.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationVehiculeService {

  listReservationVehicule$ = new BehaviorSubject<ReservationVehiculeSociete[]>([])

  constructor(private http:HttpClient) { }

  getReservationVehiculeSocieteByCollaborateur(collaborateurId: number, state: string): Observable<ReservationVehiculeSociete[]>{
    return this.http.get<ReservationVehiculeSociete[]>(`http://localhost:8080/rest/reservation-vehicule/?collaborateurId=${collaborateurId}&state=${state}`).pipe(
      tap((listReservations) => this.listReservationVehicule$.next(listReservations))
    );
  }




}
