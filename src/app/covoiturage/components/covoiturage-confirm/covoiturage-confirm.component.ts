import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-covoiturage-confirm',
  templateUrl: './covoiturage-confirm.component.html',
  styleUrls: ['./covoiturage-confirm.component.css'],
})
export class CovoiturageConfirmComponent {
  constructor(private router: Router) {}

  navigateToAnnouncesList() {
    this.router.navigateByUrl('/covoiturage/list-covoiturage');
  }
}
