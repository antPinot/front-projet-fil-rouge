import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Collaborateur } from '../models/collaborateur.model';
import { ICredentials } from '../models/credentials';
import { IToken } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8080/rest/collaborateur/'; /*url pas fonctionnel en back*/

  currentCollaborateur!: Collaborateur;

  currentToken!: IToken;

  //collaborateurId = localStorage?.getItem('collaborateurId') as unknown as number;
  
  constructor(private _http: HttpClient) { }

  /**methode login  recois un Icredentials  et retourne un observable ITOKEN*/
  login(credentials: ICredentials): Observable<IToken>{
   return this._http.post<IToken>(`http://localhost:8080/rest/collaborateur/login`, credentials).pipe(
    tap((token) => this.currentToken = token)
   ); /**http.post recoit un itoken */
  }

  findByToken(token: String): Observable<Collaborateur>{
    return this._http.post<Collaborateur>('http://localhost:8080/rest/collaborateur/token', token).pipe(
      tap((collaborateur) => this.currentCollaborateur = collaborateur)
    );
  }

  logout(): Observable<IToken>{
    return this._http.post<IToken>(`http://localhost:8080/rest/collaborateur/logout`, this.currentToken);
  }

}
