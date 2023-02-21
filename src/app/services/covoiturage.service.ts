import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {

  /**utiliser httpclient */
  constructor(private _http:HttpClient) { }
}
