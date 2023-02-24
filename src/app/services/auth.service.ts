import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/rest/Login'; /*url pas fonctionnel en back*/
  

  constructor(private _http: HttpClient) { }


  /**methode login */
  login(credentials: any){
   return this._http.post(this.url, credentials)
  }
}
