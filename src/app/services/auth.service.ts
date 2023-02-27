import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/rest/collaborateur/login'; /*url pas fonctionnel en back*/
  

  constructor(private _http: HttpClient) { }


  /**methode login */
  login(credentials: any){
    console.log(credentials)
   return this._http.post(this.url, credentials)
  }
}
