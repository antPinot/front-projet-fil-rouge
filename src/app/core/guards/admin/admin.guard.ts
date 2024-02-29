import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const adminToken = localStorage.getItem('isAdmin');
    if (adminToken) {
      return true;
    } else {
      console.log('Vous n\'êtes pas administrateur');
      localStorage.getItem('access_token') ? this.router.navigateByUrl('/home') : this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}
