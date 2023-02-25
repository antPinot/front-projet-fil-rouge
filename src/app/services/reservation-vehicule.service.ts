import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ReservationVehiculeSociete } from '../models/reservationVehiculeSociete.model';
import { VehiculeSociete } from '../models/vehicule-societe';

@Injectable({
  providedIn: 'root'
})
export class ReservationVehiculeService {

  reservationVehiculeSocieteToEdit!: ReservationVehiculeSociete

  listReservationVehicule$ = new BehaviorSubject<ReservationVehiculeSociete[]>([])

  listVehicule$ = new BehaviorSubject<VehiculeSociete[]>([])

  constructor(private http:HttpClient) { }

  getReservationVehiculeSocieteByCollaborateur(collaborateurId: number, state: string): Observable<ReservationVehiculeSociete[]>{
    return this.http.get<ReservationVehiculeSociete[]>(`http://localhost:8080/rest/reservation-vehicule/?collaborateurId=${collaborateurId}&state=${state}`).pipe(
      tap((listReservations) => this.listReservationVehicule$.next(listReservations))
    );
  }

  getAllVehiculeSociete() : Observable <VehiculeSociete[]>{
    return this.http.get<VehiculeSociete[]>('http://localhost:8080/rest/vehicule-societe').pipe(
      tap((allVehicules) => this.listVehicule$.next(allVehicules))
    );
  }

  getVehiculeSocieteDispoByDates(dateDepart: string, dateRetour: string): Observable<VehiculeSociete[]>{
    return this.http.get<VehiculeSociete[]>(`http://localhost:8080/rest/vehicule-societe/searchVehiculeSocietes?dateDepart=${dateDepart}&dateRetour=${dateRetour}`).pipe(
      tap((listVehiculeSocieteDispo) => this.listVehicule$.next(listVehiculeSocieteDispo))
    );
  }

  reserverVehiculeSociete(reservationVehiculeSociete: ReservationVehiculeSociete): Observable<ReservationVehiculeSociete>{
    return this.http.post<ReservationVehiculeSociete>(`http://localhost:8080/rest/reservation-vehicule/createReservation`, reservationVehiculeSociete);
  }

  annulerReservationVehiculeSociete(reservationVehiculeSocieteId: number | undefined): Observable<ReservationVehiculeSociete>{
    return this.http.delete<ReservationVehiculeSociete>(`http://localhost:8080/rest/reservation-vehicule/${reservationVehiculeSocieteId}`).pipe(
      tap(() => this.listReservationVehicule$.next(this.listReservationVehicule$.value.filter(r => r.id != reservationVehiculeSocieteId)))
    )
  }

  updateReservationVehiculeSociete(reservationVehiculeSociete: ReservationVehiculeSociete): Observable<ReservationVehiculeSociete>{
    return this.http.put<ReservationVehiculeSociete>(`http://localhost:8080/rest/reservation-vehicule/MAJReservation/${reservationVehiculeSociete.id}`, reservationVehiculeSociete);
  }


}
