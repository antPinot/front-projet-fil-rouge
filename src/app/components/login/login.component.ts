 
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
        console.log('Response:', data);
        const token = data && data.token;
        console.log('Access token:', token);
        if (token) {
          this.tokenService.saveToken(token);
        } else {
          console.error('Error: Token value is undefined');
        }
      },
      error => console.log(error)
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
