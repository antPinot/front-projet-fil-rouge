import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**token service pert de dire si je suis connecte ou pas */
export class TokenService {

  constructor(private router: Router) { }


  saveToken(token:string):void{
    localStorage.setItem('token', token), /**je sauvergarde le token dans le localStorage */
    this.router.navigate(['admin'])
  }
}
