import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { featureGroup, Icon, icon, latLng, Map, marker, polyline, Polyline, tileLayer } from 'leaflet';
import { AdresseService } from 'src/app/core/services/adresse.service';
import { CovoiturageService } from 'src/app/core/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-route',
  templateUrl: './covoiturage-route.component.html',
  styleUrls: ['./covoiturage-route.component.css']
})
export class CovoiturageRouteComponent {

  map!: Map;

  departCoordinates = this.adresseService.departCoordinates$

  arriveeCoordinates = this.adresseService.arriveeCoordinates$

  routeDuration = this.adresseService.routeDuration$

  routeDrawing = this.adresseService.routeDrawing$

  routePolyline!: Polyline;

  constructor(protected adresseService: AdresseService, private covoiturageService: CovoiturageService, private router: Router) { }

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

  onMapReady(map: Map) {
    this.map = map;
    this.departPin.setLatLng([this.departCoordinates.getValue().coordinates[1], this.departCoordinates.getValue().coordinates[0]])
    this.arriveePin.setLatLng([this.arriveeCoordinates.getValue().coordinates[1], this.arriveeCoordinates.getValue().coordinates[0]])
    this.departPin.addTo(this.map)
    this.arriveePin.addTo(this.map)
    let group = featureGroup([this.departPin, this.arriveePin])
    map.fitBounds(group.getBounds())
    this.drawRoute()
  }

  drawRoute() {
    this.adresseService.calculateRoute([this.departCoordinates.getValue(), this.arriveeCoordinates.getValue()]).subscribe(
      () => {
        if (this.map != null) {
          this.routePolyline = polyline(this.routeDrawing.getValue());
          this.routePolyline.addTo(this.map);
        }
      }
    );
  }

  onSubmit(){
    this.router.navigateByUrl('/covoiturage/create/details')
  }



}
