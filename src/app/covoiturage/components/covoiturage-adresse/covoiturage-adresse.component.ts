import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icon, icon, latLng, Map, marker, tileLayer } from 'leaflet';
import { AdresseService } from 'src/app/core/services/adresse.service';
import { CovoiturageService } from 'src/app/core/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-adresse',
  templateUrl: './covoiturage-adresse.component.html',
  styleUrls: ['./covoiturage-adresse.component.css']
})
export class CovoiturageAdresseComponent implements OnInit{

  isAdresseDepart!: boolean;

  step!: string;

  adresseForm!: FormGroup;

  map!: Map;

  departCoordinates = this.adresseService.departCoordinates$

  arriveeCoordinates = this.adresseService.arriveeCoordinates$

  adressesResults = this.adresseService.listAdressesForAutocompleteDepart$;

  adresseDepart = this.covoiturageService.adresseDepart;

  adresseArrivee = this.covoiturageService.adresseArrivee;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: latLng(43.6112422, 3.8767337)
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
    }
  }

  pin = marker([0, 0], {
    icon: icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  })

  constructor(private formBuilder: FormBuilder, protected adresseService: AdresseService, private covoiturageService: CovoiturageService, private router:Router){}

  ngOnInit(): void {
    this.adresseDepart == null ? this.isAdresseDepart = true : this.isAdresseDepart = false;
    this.adresseForm = this.formBuilder.group({
      adresse : [null, Validators.required]
    })
    this.isAdresseDepart ? this.step = 'e départ' : this.step = '\' arrivée';
  }

  onKeyup() {
    let valueInput = this.adresseForm.get('adresse')?.value;
    this.adresseService.findByUserQueryWithPhotonAPI(valueInput, true).subscribe();
  }

  addMarker() {
    this.isAdresseDepart ? this.departCoordinates.subscribe() : this.arriveeCoordinates.subscribe();
    this.pin.setLatLng([this.departCoordinates.getValue().coordinates[1], this.departCoordinates.getValue().coordinates[0]])
    if (this.map != null) {
      this.pin.addTo(this.map);
    }
  }

  onSubmit(){
    this.adresseDepart = this.adresseForm.value.adresse;
    this.router.navigateByUrl('/covoiturage/create/adresse-depart')
  }

}
