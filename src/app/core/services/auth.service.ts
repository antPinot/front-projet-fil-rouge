import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Collaborateur } from '../models/collaborateur.model';
import { ICredentials } from '../models/credentials';
import { ICredentials1 } from '../models/credentials1';
import { IToken } from '../models/token';
import { IPasswordReset } from '../models/IPasswordReset';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8080/rest/collaborateur/';

  currentCollaborateur!: Collaborateur;

  currentToken!: IToken;

  logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  adminLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //collaborateurId = localStorage?.getItem('collaborateurId') as unknown as number;
  
  url1 = 'http://localhost:8080/rest/collaborateur'
  constructor(private _http: HttpClient,private router: Router,  ) { }

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
    return this._http.post<IToken>(`http://localhost:8080/rest/collaborateur/logout`, this.currentToken)
  }

  passwordReset(passwordReset: IPasswordReset): Observable<boolean>{
    return this._http.post<boolean>(`http://localhost:8080/rest/collaborateur/passwordreset`, passwordReset);
  }

  passwordResetToken(mail: String): Observable<boolean>{
    return this._http.post<boolean>(`http://localhost:8080/rest/collaborateur/passwordresettoken`, mail);
  }



/*
  //methode logout  //
  logout(): void {
    localStorage.removeItem('token');
  }*/



  /**methode register */
  register(credentials: ICredentials1): Observable<IToken> {
  return this._http.post<IToken>(`${this.url1}/register`, credentials);
}

}
