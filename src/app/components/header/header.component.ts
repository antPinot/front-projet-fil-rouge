import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router:Router){ }

  onLogout(){
    this.authService.logout().pipe(
      tap(() => localStorage.clear()),
      tap(() => this.router.navigateByUrl('/Login'))
    ).subscribe()
  }

}
