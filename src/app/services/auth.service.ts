import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredentials } from '../models/credentials';
import { IToken } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/rest/collaborateur/login'; /*url pas fonctionnel en back*/
  

  constructor(private _http: HttpClient) { }


  /**methode login  recois un Icredentials  et retourne un observable ITOKEN*/
  login(credentials: ICredentials): Observable<IToken>{
   return this._http.post<IToken>(this.url, credentials) /**http.post recoi un itoken */
  }
}
