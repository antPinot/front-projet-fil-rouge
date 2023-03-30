import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  
constructor( 
  private authService: AuthService, 
  private tokenService: TokenService,
  private router: Router
 ){}


  /**methode logout */
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['auth/login']);
    
  }

}
