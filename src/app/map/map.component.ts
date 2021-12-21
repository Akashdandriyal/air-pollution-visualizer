import { Component, AfterViewInit, Injector, ComponentFactoryResolver, ApplicationRef, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { MapPopupComponent } from '../map-popup/map-popup.component';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {
  map: any;
  popup: any;
  darkmode: boolean = false;
  tiles: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    let mode = localStorage.getItem('mode');
    if(mode == 'true') {
      this.darkmode = true;
    } 
    else if(mode == 'false') {
      this.darkmode = false;
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

   initMap(): void {
    this.map = L.map('map', {
      center: [ 33.5780, -4.9218 ],
      zoom: 2.5
    });
    //https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png
    this.tiles = L.tileLayer(this.darkmode === false ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${environment.mapToken}` : `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${environment.mapToken}`, {
      maxZoom: 18,
      minZoom: 2
    });

    this.tiles.addTo(this.map);

    this.map.on('click', (e: any) => this.onMapClick(e, this.map));
  }

  onMapClick(e: any, map: any): void {
    this.popup = L.popup({maxWidth: 400, minWidth: 300, maxHeight: 500});
    let markerPopup: any = this.compileComponent(MapPopupComponent, 
      (c: any) => {c.instance.coordinates = e.latlng});
    this.popup
    .setLatLng(e.latlng)
    .setContent(markerPopup)
    .openOn(map);
    this.changePopupColor();
  }
  
  // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'  
  // 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
  changeMode(){
    this.darkmode = !this.darkmode;
    if(this.darkmode)
      localStorage.setItem('mode', 'true');
    else
      localStorage.setItem('mode', 'false');
    this.map.removeLayer(this.tiles);
    this.tiles = L.tileLayer(this.darkmode === false ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${environment.mapToken}` : `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${environment.mapToken}`, {
      maxZoom: 18,
      minZoom: 2
    });
    this.tiles.addTo(this.map);
    this.changePopupColor();
  }

  compileComponent(component: any, onAttach: any): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);
 
    if (onAttach)
      onAttach(compRef);
 
    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));
 
    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        console.log(position)
        let coordinates = L.latLng(position.coords.latitude, position.coords.longitude);
        let markerPopup: any = this.compileComponent(MapPopupComponent, 
          (c: any) => {c.instance.coordinates = coordinates});
        console.log(coordinates);
        this.popup = L.popup({maxWidth: 400, minWidth: 300, maxHeight: 500});
        this.popup
        .setContent(markerPopup)
        let marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.map).bindPopup(this.popup).openPopup();
        this.changePopupColor();
      },
      (err) => {
        alert("Permission not granted");
      }
      );
    }
    else {
      console.log("Geolocation is not supported by this browser");
    }
  }

  changePopupColor(): void {
    let popupTop = document.getElementsByClassName('leaflet-popup-content-wrapper');
    let popupBottom = document.getElementsByClassName('leaflet-popup-tip');
    for (let i = 0; i < popupTop.length; i++) {
      let elementTop = popupTop[i] as HTMLElement;
      let elementBottom = popupBottom[i] as HTMLElement;
      if(this.darkmode) {
        // domElement.classList.add('dark-popup');
        elementTop.style.backgroundColor = 'Black';
        elementTop.style.color = 'White';
        elementBottom.style.backgroundColor = 'Black';
      }
      else {
        // domElement.classList.remove('dark-popup');
        elementTop.style.backgroundColor = 'White';
        elementTop.style.color = 'Black';
        elementBottom.style.backgroundColor = 'White';
      }
    }
  }

}
