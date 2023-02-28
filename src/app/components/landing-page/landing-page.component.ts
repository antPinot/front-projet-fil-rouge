import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

/**
 * Component de page d'accueil vers lequel le collaborateur
 * est redirigé après sa connexion. Affiche les informations 
 * personnelles du collaborateur.
 * 
 * Note : Ce component est amené à évoluer et pourrait devenir "Mon profil ou Mes informations Personnelles"
 * 
 */
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  /** Collaborateur connecté */
  currentCollaborateur = this.authService.currentCollaborateur;

  constructor(private authService: AuthService) { }

}
