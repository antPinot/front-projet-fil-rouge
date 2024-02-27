import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Covoiturage } from '../models/covoiturage';

/**
 * 
 * Classe fournissant des méthodes de service pour les 
 * components de réservation de covoiturage
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ReservationCovoiturageService {

  /** Liste des réservations de covoiturage d'un collaborateur */
  listReservationCovoiturage$ = new BehaviorSubject<Covoiturage[]>([])

  /** Liste des covoiturages disponibles en fonction d'une date de départ (Résultats de recherche)*/
  listCovoiturageByDateDepart$ = new BehaviorSubject<Covoiturage[]>([])

  /** Booléen permettant de gérer l'affichage du bouton de suppression d'une réservation de covoiturage */
  enCours: boolean = true;

  /**Booléen permettant de savoir si une réservation en cours est consultée ou si elle est en cours de suppression */
  isConsulted: boolean = true;

  constructor(private http:HttpClient) { }

  /**
   * Requête GET récupérant la liste des covoiturages d'un collaborateur connecté
   * 
   * @param collaborateurId en fonction de l'Id du collaborateur connecté
   * @param state en fonction du statut : en-cours ou historique
   * @returns 
   */
  getListReservationCovoiturageByCollaborateur(collaborateurId: number, state: string) : Observable<Covoiturage[]>{
    return this.http.get<Covoiturage[]>(`http://localhost:8080/rest/covoiturage/?collaborateurId=${collaborateurId}&state=${state}`).pipe(
      tap((reservations) => this.listReservationCovoiturage$.next(reservations)));
  }

  /**
   * Requête GET récupérant la liste des covoiturages disponibles pour un collaborateur connecté
   * 
   * @param collaborateurId en fonction de l'Id du collaborateur connecté
   * @param dateDepart en fonction de la date de départ fournie dans le formulaire de recherche
   * @returns 
   */
  getCovoiturageByCriteres(collaborateurId: number, adresseDepartId: number, adresseArriveeId: number, dateDepart : string): Observable<Covoiturage[]>{
    return this.http.get<Covoiturage[]>(`http://localhost:8080/rest/covoiturage/criteres?collaborateurId=${collaborateurId}&adresseDepartId=${adresseDepartId}&adresseArriveeId=${adresseArriveeId}&dateDepart=${dateDepart}`)
    .pipe(
      tap((covoituragesByDateDepart) => this.listCovoiturageByDateDepart$.next(covoituragesByDateDepart))
    );
  }

  /**
   * Requête PUT annulant la participation à un covoiturage d'un collaborateur connecté
   * 
   * @param collaborateurId en fonction de l'Id du collaborateur connecté
   * @param covoiturage en fonction du covoiturage à modifier
   * @returns 
   */
  annulerReservationCovoiturage(collaborateurId: number, covoiturage: Covoiturage): Observable<Covoiturage>{
    return this.http.put<Covoiturage>(`http://localhost:8080/rest/covoiturage/annuler-participation/${covoiturage.id}/${collaborateurId}`,covoiturage).pipe(
      tap((covoiturageAnnule) => {
        let updatedListReservationCovoiturage = this.listReservationCovoiturage$.value.filter(c => c.id != covoiturageAnnule.id);
        this.listReservationCovoiturage$.next(updatedListReservationCovoiturage);
      })
    )
  }

  /**
   * Requête PUT confirmant la participation à un covoiturage d'un collaborateur connecté
   * 
   * @param collaborateurId en fonction de l'Id du collaborateur connecté
   * @param covoiturage en fonction du covoiturage à modifier
   * @returns 
   */
  reserverCovoiturage(collaborateurId: number, covoiturage: Covoiturage): Observable<Covoiturage>{
    return this.http.put<Covoiturage>(`http://localhost:8080/rest/covoiturage/reserver/${covoiturage.id}/${collaborateurId}`, covoiturage).pipe(
      tap((covoiturageReserve) => {
        this.listReservationCovoiturage$.value.push(covoiturageReserve);
      })
    )
  }

}
