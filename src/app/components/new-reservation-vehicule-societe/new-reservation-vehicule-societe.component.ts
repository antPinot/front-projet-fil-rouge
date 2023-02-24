import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-reservation-vehicule-societe',
  templateUrl: './new-reservation-vehicule-societe.component.html',
  styleUrls: ['./new-reservation-vehicule-societe.component.css']
})
export class NewReservationVehiculeSocieteComponent implements OnInit {

  reservationVehiculeSocieteForm!: FormGroup

  slides = ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
'https://cdn.futura-sciences.com/sources/images/dossier/773/01-intro-773.jpg']

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.reservationVehiculeSocieteForm = this.formBuilder.group({
      dateDepart: [null, Validators.required],
      dateRetour: [null, Validators.required]
    })
  }

  onSubmitForm() {

  }

}
