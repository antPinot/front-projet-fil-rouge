import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faIdCard, faCar, faUsers, faDoorOpen, faTaxi, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';


/** 
 * 
 * Component gérant le menu de navigation 
 * et la déconnexion du collaborateur
 * 
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logged$ = this.authService.logged$;

  adminLogged$ = this.authService.adminLogged$;

  faUser = faUser
  faIdCard = faIdCard
  faCar = faCar
  faUsers = faUsers
  faDoorOpen = faDoorOpen
  faTaxi = faTaxi
  faBuilding = faBuilding

  constructor(private authService: AuthService, private router:Router){ }

  /** Gère la déconnexion : Vide le local storage et redirige vers le component de connexion */
  onLogout(){
    this.authService.logout().pipe(
      tap(() => localStorage.clear()),
      tap(() => {
        this.logged$.next(false);
        this.adminLogged$.next(false);
      }),
      tap(() => this.router.navigateByUrl('/Login'))
    ).subscribe()
  }

}
