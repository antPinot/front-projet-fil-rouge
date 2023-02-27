 
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


/**INTERFACE credentials */
interface ICredentials{
  email: string,
  password: string
}

/**interface token */
interface IToken{
  access_token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor( private authService: AuthService){}

/**objet form */
form: ICredentials ={

  email: '',
  password: '',

}

  onSubmit(): void{
    console.log(this.form);
    

    /**appel au service  */
    this.authService.login(this.form).subscribe(

      (data:IToken) => console.log(data.access_token),
      error => console.log(error)
    );
  }
  ngOnInit(): void{}
}
