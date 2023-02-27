import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogoutComponent } from '../components/logout/logout.component';
import { ICredentials } from '../models/credentials';
import { IToken } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/rest/collaborateur/login'; /*url pas fonctionnel en back*/
  
  

  constructor(private _http: HttpClient,private router: Router,  ) { }


  /**methode login  recois un Icredentials  et retourne un observable ITOKEN*/
  login(credentials: ICredentials): Observable<IToken>{
   return this._http.post<IToken>(this.url, credentials) /**http.post recoi un itoken */
  }



  /**methode logout  */
  logout(): void {
    localStorage.removeItem('token');
  }



  /**methode register */
  register(credentials: ICredentials): Observable<IToken> {
  return this._http.post<IToken>(`${this.url}/register`, credentials);
}

}
