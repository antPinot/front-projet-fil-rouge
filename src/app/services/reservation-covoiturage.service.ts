import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Covoiturage } from '../models/covoiturage';

@Injectable({
  providedIn: 'root'
})
export class ReservationCovoiturageService {

  listReservationCovoiturage$ = new BehaviorSubject<Covoiturage[]>([])

  listCovoiturageByDateDepart$ = new BehaviorSubject<Covoiturage[]>([])

  enCours: boolean = true;

  constructor(private http:HttpClient) { }

  getListReservationCovoiturageByCollaborateur(collaborateurId: number, state: string) : Observable<Covoiturage[]>{
    return this.http.get<Covoiturage[]>(`http://localhost:8080/rest/covoiturage/?collaborateurId=${collaborateurId}&state=${state}`).pipe(
      tap((reservations) => this.listReservationCovoiturage$.next(reservations)));
  }

  getCovoiturageByDateDepart(collaborateurId: number, dateDepart : string): Observable<Covoiturage[]>{
    return this.http.get<Covoiturage[]>(`http://localhost:8080/rest/covoiturage/criteres?collaborateurId=${collaborateurId}&adresseDepart=none&adresseArrivee=none&dateDepart=${dateDepart}`)
    .pipe(
      tap((covoituragesByDateDepart) => this.listCovoiturageByDateDepart$.next(covoituragesByDateDepart))
    );
  }

  annulerReservationCovoiturage(collaborateurId: number, covoiturage: Covoiturage): Observable<Covoiturage>{
    return this.http.put<Covoiturage>(`http://localhost:8080/rest/covoiturage/annuler-participation/${covoiturage.id}/${collaborateurId}`,covoiturage).pipe(
      tap((covoiturageAnnule) => {
        let updatedListReservationCovoiturage = this.listReservationCovoiturage$.value.filter(c => c.id != covoiturageAnnule.id);
        this.listReservationCovoiturage$.next(updatedListReservationCovoiturage);
      })
    )
  }
}
