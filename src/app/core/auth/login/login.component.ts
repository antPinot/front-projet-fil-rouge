
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICredentials } from '../../models/credentials';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  failedLogin!: boolean

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  /**objet form */
  form: ICredentials = {
    login: '',
    password: '',
  }

  onSubmit(): void {

    /**appel au service  */
    this.authService.login(this.form).subscribe(
      {
        next: (data) => {
          this.tokenService.saveToken(data)
          this.authService.findByToken(data.access_token).subscribe(
            () => {
              this.failedLogin = false;
              this.router.navigate(['home']);
            }
          )

        },
        error: (error) => {
          console.log(error)
          this.failedLogin = true;
        }
      }
    );

  }



  /**methode pour savoir si user est connecté */
  

  /**methode onLogout au click  FONCTIONNE*/
  onLogout(){
    console.log("coucou");
    return this.tokenService.clearToken();
  }
   
  ngOnInit(): void {
    
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken(); // renvoie true si le token existe, false sinon
  }
   
}
