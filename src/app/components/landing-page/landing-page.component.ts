import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  currentCollaborateur = this.authService.currentCollaborateur;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    console.log(this.currentCollaborateur)
  }

}
