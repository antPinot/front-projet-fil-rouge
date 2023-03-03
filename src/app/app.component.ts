import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'angular-front-end-gp3';

  constructor(private router:Router) {}

  ngOnInit(): void {
    localStorage.clear();
   // this.router.navigateByUrl('Login');
  }

}
