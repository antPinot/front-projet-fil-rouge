import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { Adresse } from 'src/app/core/models/adresse';
import { AdresseService } from '../../../core/services/adresse.service';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationCovoiturageService } from '../../../core/services/reservation-covoiturage.service';
import { tileLayer, latLng, circle, polygon, marker, Icon, icon, Map, polyline, Polyline } from 'leaflet'

/**
 * Component gérant la recherche d'un covoiturage
 * 
 */
@Component({
  selector: 'app-search-covoiturage',
  templateUrl: './search-covoiturage.component.html',
  styleUrls: ['./search-covoiturage.component.css']
})
export class SearchCovoiturageComponent implements OnInit, OnDestroy {

  map?: Map;

  /** Id du collaborateur connecté */
  collaborateurId?= this.authService.currentCollaborateur?.id;

  adressesDepartResult = this.adresseService.listAdressesForAutocompleteDepart$

  adressesArriveeResult = this.adresseService.listAdressesForAutocompleteArrivee$

  departCoordinates = this.adresseService.departCoordinates$

  arriveeCoordinates = this.adresseService.arriveeCoordinates$

  routeDuration = this.adresseService.routeDuration$

  routeDrawing = this.adresseService.routeDrawing$

  /** Formulaire de recherche */
  searchForm!: FormGroup;

  /** Résultat de la recherche : Liste des covoiturages */
  searchResults$ = this.reservationCovoiturageService.listCovoiturageByDateDepart$;

  /** Date courante : Minimum pour effectuer une recherche par date */
  minDate = new Date();

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

  departPin = marker([0, 0], {
    icon: icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  })

  arriveePin = marker([0, 0], {
    icon: icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  })

  routePolyline!: Polyline;

  constructor(private reservationCovoiturageService: ReservationCovoiturageService, private formBuilder: FormBuilder, private authService: AuthService, private adresseService: AdresseService,
    private adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private locale: string) { }

  /** Initialisation du formulaire */
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      adresseDepart: [null],
      adresseArrivee: [null],
      searchDateDepart: [null, Validators.required]
    })

    /*this.searchForm.get('adresseArrivee')?.valueChanges.pipe(
      map((adresseSearch) => this.adresseService.findByUserQuery(adresseSearch).subscribe())
    ).subscribe()*/

  }

  onKeyupAdresseDepart() {
    let valueInput = this.searchForm.get('adresseDepart')?.value;
    this.adresseService.findByUserQueryWithPhotonAPI(valueInput, true).subscribe();
  }

  onKeyupAdresseArrivee() {
    let valueInput = this.searchForm.get('adresseArrivee')?.value;
    this.adresseService.findByUserQueryWithPhotonAPI(valueInput, false).subscribe()
  }

  displayAdresse(adresse: Adresse): string {
    if (adresse !== null) {
      let complementNum: boolean;
      adresse.complementNumero ? complementNum = true : complementNum = false;
      return complementNum ? `${adresse.numero} ${adresse.complementNumero} ${adresse.voie} ${adresse.codePostal} ${adresse.ville} ${adresse.departement} ${adresse.pays} ` : `${adresse.numero} ${adresse.voie} ${adresse.codePostal} ${adresse.ville} ${adresse.departement} ${adresse.pays} `
    }
    return '';
  }

  /** Réinitialisation de la liste des covoiturages disponbiles à la destruction du component */
  ngOnDestroy(): void {
    this.searchResults$.next([]);
  }

  /** Recherche d'un covoiturage par date, formatage de la date récupérér par datetimepicker (Angular Material) via moment.js*/
  onSearch() {
    if (this.collaborateurId) {
      let formattedDate = moment(this.searchForm.value.searchDateDepart).format("DD/MM/YYYY");
      console.log(this.searchForm.value.adresseDepart)
      if ((this.searchForm.value.adresseDepart == null || this.searchForm.value.adresseDepart == "") && (this.searchForm.value.adresseArrivee == null || this.searchForm.value.adresseArrivee == "")) {
        this.reservationCovoiturageService.getCovoiturageByCriteres(this.collaborateurId, 0, 0, formattedDate).subscribe();
      } else if (this.searchForm.value.adresseArrivee == null || this.searchForm.value.adresseArrivee == "") {
        this.reservationCovoiturageService.getCovoiturageByCriteres(this.collaborateurId, this.searchForm.value.adresseDepart.id, 0, formattedDate).subscribe();
      } else if (this.searchForm.value.adresseDepart == null || this.searchForm.value.adresseDepart == "") {
        this.reservationCovoiturageService.getCovoiturageByCriteres(this.collaborateurId, 0, this.searchForm.value.adresseArrivee.id, formattedDate).subscribe();
      } else {
        console.log("erreur");
      }
    }
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  addMarker(depart: boolean) {
    depart ? this.departCoordinates.subscribe() : this.arriveeCoordinates.subscribe();
    depart ? this.departPin.setLatLng([this.departCoordinates.getValue().coordinates[1], this.departCoordinates.getValue().coordinates[0]])
      : this.arriveePin.setLatLng([this.arriveeCoordinates.getValue().coordinates[1], this.arriveeCoordinates.getValue().coordinates[0]])
    if (this.map != null) {
      depart ? this.departPin.addTo(this.map) : this.arriveePin.addTo(this.map);
    }
  }

  calculateRouteDuration() {
    this.adresseService.calculateTimeBetweenAdresses([this.departCoordinates.getValue(), this.arriveeCoordinates.getValue()], false).subscribe();
    console.log(this.routeDuration)
  }

  changeCenter() {
    this.map?.panTo(latLng(45.4401467, 4.3873058))
  }

  drawRoute() {
    this.adresseService.drawRoutesBetweenAdresses([this.departCoordinates.getValue(), this.arriveeCoordinates.getValue()]).subscribe(
      () => {
        if (this.map != null) {
          console.log(this.routeDrawing.getValue())
          this.routePolyline = polyline(this.routeDrawing.getValue());
          this.routePolyline.addTo(this.map);
        }
      }
    );
  }

  reset() {
    if (this.map != null) {
      this.departPin.removeFrom(this.map)
      this.arriveePin.removeFrom(this.map)
      this.routePolyline.removeFrom(this.map)
    }

  }
}
