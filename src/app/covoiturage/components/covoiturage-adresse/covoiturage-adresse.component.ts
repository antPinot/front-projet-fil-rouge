import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icon, icon, latLng, Map, marker, tileLayer } from 'leaflet';
import { Adresse } from 'src/app/core/models/adresse';
import { AdresseService } from 'src/app/core/services/adresse.service';
import { CovoiturageService } from 'src/app/core/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-adresse',
  templateUrl: './covoiturage-adresse.component.html',
  styleUrls: ['./covoiturage-adresse.component.css']
})
export class CovoiturageAdresseComponent implements OnInit, OnDestroy{

  isAdresseDepart!: boolean;

  step!: string;

  adresseForm!: FormGroup;

  map!: Map;

  departCoordinates = this.adresseService.departCoordinates$

  arriveeCoordinates = this.adresseService.arriveeCoordinates$

  adressesDepartResults =this.adresseService.listAdressesForAutocompleteDepart$;

  adressesArriveeResults = this.adresseService.listAdressesForAutocompleteArrivee$;

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
    /** Réinitialise les adresses si on est sur la page d'entrée de l'adresse de départ */
    if (this.router.url == "/covoiturage/create/adresse-depart"){
      this.adresseDepart = null
      this.adresseArrivee = null
      this.isAdresseDepart = true;
      /** Réinitialise uniquement l'adresse d'arrivée si on est sur la page d'entrée de l'adresse d'arrivée */
    } else {
      this.adresseArrivee = null
      this.isAdresseDepart = false;
    }
    this.adresseForm = this.formBuilder.group({
      adresse : [null, Validators.required]
    })
    this.isAdresseDepart ? this.step = 'e départ' : this.step = '\' arrivée';
  }

  onKeyup() {
    this.searchAdresseWithPhoton();
  }

  displayAdresse(adresse: Adresse): string {
    if (adresse !== null) {
      let complementNum: boolean;
      adresse.complementNumero ? complementNum = true : complementNum = false;
      return complementNum ? `${adresse.numero} ${adresse.complementNumero} ${adresse.voie} ${adresse.codePostal} ${adresse.ville} ${adresse.departement} ${adresse.pays} ` : `${adresse.numero} ${adresse.voie} ${adresse.codePostal} ${adresse.ville} ${adresse.departement} ${adresse.pays} `
    }
    return '';
  }

  searchAdresseWithPhoton(adresse?: Adresse){
    let valueInput;
    adresse?  valueInput = this.displayAdresse(adresse) : valueInput = this.adresseForm.get('adresse')?.value;
    // console.log(valueInput)
    this.isAdresseDepart ? this.adresseService.findByUserQueryWithPhotonAPI(valueInput, true).subscribe(() => {
      this.pin.setLatLng([this.departCoordinates.getValue().coordinates[1], this.departCoordinates.getValue().coordinates[0]])
      if (adresse){
        this.map.panTo(latLng(this.pin.getLatLng()))
      }
    }) : this.adresseService.findByUserQueryWithPhotonAPI(valueInput, false).subscribe(() => {
      this.pin.setLatLng([this.arriveeCoordinates.getValue().coordinates[1], this.arriveeCoordinates.getValue().coordinates[0]])
      if (adresse){
        this.map.panTo(latLng(this.pin.getLatLng()))
      }
    })
  }

  addMarker(adresse:Adresse) {
    this.searchAdresseWithPhoton(adresse);
    if (this.map != null) {
      // this.map.panTo(latLng(this.pin.getLatLng()));
      this.pin.addTo(this.map);
    }

  }

  onMapReady(map: Map) {
    this.map = map;
  }

  onSubmit(){
    this.isAdresseDepart ? this.covoiturageService.adresseDepart = this.adresseForm.value.adresse : this.covoiturageService.adresseArrivee = this.adresseForm.value.adresse;
    this.isAdresseDepart ? this.router.navigateByUrl('/covoiturage/create/adresse-arrivee') : this.router.navigateByUrl('/covoiturage/create/route');
  }

  ngOnDestroy(): void {
    // this.adressesResults.next([]);
  }

}
