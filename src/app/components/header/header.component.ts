import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService, private router:Router){ }

  /** Gère la déconnexion : Vide le local storage et redirige vers le component de connexion */
  onLogout(){
    this.authService.logout().pipe(
      tap(() => localStorage.clear()),
      tap(() => this.router.navigateByUrl('/Login'))
    ).subscribe()
  }

}
