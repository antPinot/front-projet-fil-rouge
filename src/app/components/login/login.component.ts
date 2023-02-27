 
import { Component, OnInit } from '@angular/core';
import { ICredentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor( 
   private authService: AuthService, 
   private tokenService: TokenService
  ){}

/**objet form */
form: ICredentials ={

  email: '',
  password: '',

}

  onSubmit(): void{
    console.log(this.form);
    

    /**appel au service  */
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data.access_token)
        this.tokenService.saveToken(data.access_token)
      },
      error => console.log(error)
    );
  }
  ngOnInit(): void{}
}
