import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ReservationVehiculeSociete } from '../models/reservationVehiculeSociete.model';
import { VehiculeSociete } from '../models/vehicule-societe';

/**
 * 
 * Classe fournissant des méthodes de service pour les 
 * components de réservation de véhicule de société
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ReservationVehiculeService {

  /** Réservation de véhicule de société à modifier */
  reservationVehiculeSocieteToEdit!: ReservationVehiculeSociete

  /** Liste des réservations de véhicules de société d'un collaborateur */
  listReservationVehicule$ = new BehaviorSubject<ReservationVehiculeSociete[]>([])

  /** Liste des véhicules de société disponibles en fonction d'une date de départ et d'une date de retour(Résultats de recherche)*/
  listVehicule$ = new BehaviorSubject<VehiculeSociete[]>([])

  constructor(private http:HttpClient) { }

  /**
   * Requête GET récupérant la liste des réservations de véhicules de société d'un collaborateur connecté
   * 
   * @param collaborateurId en fonction de l'Id du collaborateur connecté
   * @param state en fonction du statut : en-cours ou historique
   * @returns 
   */
  getReservationVehiculeSocieteByCollaborateur(collaborateurId: number | undefined, state: string): Observable<ReservationVehiculeSociete[]>{
    return this.http.get<ReservationVehiculeSociete[]>(`http://localhost:8080/rest/reservation-vehicule/?collaborateurId=${collaborateurId}&state=${state}`).pipe(
      tap((listReservations) => this.listReservationVehicule$.next(listReservations))
    );
  }

  /**
   * Requête GET récupérant la liste de tous les véhicules de société
   * 
   * Attention : Ce service a été implémenté provisoirement pour des tests
   * sur l'édition des réservations de véhicule de société et est amené à
   * être supprimé
   * 
   * @returns 
   */
  getAllVehiculeSociete() : Observable <VehiculeSociete[]>{
    return this.http.get<VehiculeSociete[]>('http://localhost:8080/rest/vehicule-societe').pipe(
      tap((allVehicules) => this.listVehicule$.next(allVehicules))
    );
  }

  /**
   * Requête GET récupérant la liste des réservations de véhicules de société disponibles pour un collaborateur connecté
   * 
   * @param dateDepart en fonction de la date de départ fournie dans le formulaire de recherche
   * @param dateRetour en fonction de la date de retour fournie dans le formulaire de recherche
   * @returns 
   */
  getVehiculeSocieteDispoByDates(dateDepart: string, dateRetour: string): Observable<VehiculeSociete[]>{
    return this.http.get<VehiculeSociete[]>(`http://localhost:8080/rest/vehicule-societe/searchVehiculeSocietes?dateDepart=${dateDepart}&dateRetour=${dateRetour}`).pipe(
      tap((listVehiculeSocieteDispo) => this.listVehicule$.next(listVehiculeSocieteDispo))
    );
  }

  /**
   * Requête POST de création d'une réservation de véhicule de société
   * 
   * @param reservationVehiculeSociete en fonction de la réservation à créer
   * @returns 
   */
  reserverVehiculeSociete(reservationVehiculeSociete: ReservationVehiculeSociete): Observable<ReservationVehiculeSociete>{
    return this.http.post<ReservationVehiculeSociete>(`http://localhost:8080/rest/reservation-vehicule/createReservation`, reservationVehiculeSociete);
  }

  /**
   * Requête DELETE d'annulation d'une réservation de véhicule de société
   * 
   * @param reservationVehiculeSocieteId en fonction de l'Id de la réservation à annuler
   * @returns 
   */
  annulerReservationVehiculeSociete(reservationVehiculeSocieteId: number | undefined): Observable<ReservationVehiculeSociete>{
    return this.http.delete<ReservationVehiculeSociete>(`http://localhost:8080/rest/reservation-vehicule/${reservationVehiculeSocieteId}`).pipe(
      tap(() => this.listReservationVehicule$.next(this.listReservationVehicule$.value.filter(r => r.id != reservationVehiculeSocieteId)))
    )
  }

  /**
   * Requête PUT de modification de réservation d'un véhicule de société
   * 
   * @param reservationVehiculeSociete en fonction de la réservation à modifier
   * @returns 
   */
  updateReservationVehiculeSociete(reservationVehiculeSociete: ReservationVehiculeSociete): Observable<ReservationVehiculeSociete>{
    return this.http.put<ReservationVehiculeSociete>(`http://localhost:8080/rest/reservation-vehicule/MAJReservation/${reservationVehiculeSociete.id}`, reservationVehiculeSociete);
  }


}
