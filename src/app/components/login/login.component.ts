
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICredentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';



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
    private router:Router
  ) { }

  /**objet form */
  form: ICredentials = {
    login: '',
    password: '',
  }

  onSubmit(): void {

    /**appel au service  */
    this.authService.login(this.form).subscribe(
      { next : (data) => {
        this.tokenService.saveToken(data)
        this.authService.findByToken(data.access_token).subscribe(
          collaborateur => console.log(collaborateur)
        )
        this.failedLogin = false;
        this.router.navigate(['covoiturage/reservation/search']);
      },
      error : (error) => {
        console.log(error)
        this.failedLogin = true;
      }
    }
    );

  }
  ngOnInit(): void { }
}
