import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IToken } from '../models/token';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

/**token service pert de dire si je suis connecte ou pas */
export class TokenService {


  constructor(private router: Router, private authService: AuthService) { }


  saveToken(token: IToken): void {
    localStorage.setItem('access_token', token.access_token) /**je sauvergarde le token dans le localStorage */
    this.authService.logged$.next(true);
    if (token.isAdmin != undefined) {
      localStorage.setItem('isAdmin', token.isAdmin);
      this.authService.adminLogged$.next(true);
    }

  }




  //methode getToken  //
  getToken(): boolean {

    const token = localStorage.getItem('token')
    console.log(token)
    return !!token

  }

  //methode cleartoken //
  clearToken() {
    localStorage.removeItem('token')
    this.router.navigate(["/"]);
  }


  //methode Savetoken // 
  saveRegisterToken(token: string): boolean {
    try {
      localStorage.setItem('token', token);
      return true;
    } catch (e) {
      console.error('Error saving token:', e);
      return false;
    }
  }
}
