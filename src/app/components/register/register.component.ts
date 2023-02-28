import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICredentials1 } from 'src/app/models/credentials1';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  /**objet form */
form: ICredentials1 = {
    
  matricule: 0,
  nom: '',
  prenom: '',
  dateNaissance: '',
  telephone: 0,
  mail: '',
  login: '',
  password: '',
  dateCreation: ''
   

}

  

constructor( private authService: AuthService, 
  private tokenService: TokenService, private router: Router){}
  

  onSubmit():void{
    console.log(this.form);
  }

  onRegister() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log('Response:', data);
        const token =  data.token;
        this.tokenService.saveToken(token);
        //this.router.navigate(['admin']);
      },
      error => console.log(error)
    );
  }

}
