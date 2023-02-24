import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor(private http: HttpClient){}

/**objet form */
form: any ={

  email: null,
  password: null

}

  onSubmit(){
    console.log(this.form);
    

    /**ici la route ne marche pas car pas ENCORE implementer dans le back  */
    this.http.post('http://localhost:8080/rest/Login', this.form).subscribe(

      data => console.log(data),
      error => console.log(error)
    );
  }
  ngOnInit(): void{}
}
