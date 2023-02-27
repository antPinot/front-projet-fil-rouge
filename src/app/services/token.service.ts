import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IToken } from '../models/token';

@Injectable({
  providedIn: 'root'
})

/**token service pert de dire si je suis connecte ou pas */
export class TokenService {

  constructor(private router: Router) { }


  saveToken(token:IToken):void{
    localStorage.setItem('access_token', token.access_token) /**je sauvergarde le token dans le localStorage */
    //localStorage.setItem('collaborateurId', token.collaborateurId);
  }
}
