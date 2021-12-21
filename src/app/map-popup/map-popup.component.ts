import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class MapPopupComponent implements OnInit {

  @Input() coordinates: any;
  pollutionData: any;
  positionData: any;
  graphData: any;
  darkmode: boolean = false;
  constructor(private _mapPopupService: MapService) { }

  ngOnInit(): void {
    this._mapPopupService.getPosition(this.coordinates.lat, this.coordinates.lng).subscribe(
      responseData => this.positionData = responseData,
      responseError => console.error(responseError),
      () => this.showData(this.positionData)
    );

    this._mapPopupService.getCurrentPollutionData(this.coordinates.lat, this.coordinates.lng).subscribe(
      responseData => this.pollutionData = responseData,
      responseError => console.error(responseError),
      () => {
        this.showData(this.pollutionData)
        this.graphData = Object.keys(this.pollutionData.list[0].components);
        this.graphData = this.graphData.map((key: any) => {
          return {
            name: key,
            value: this.pollutionData.list[0].components[key]
          }
        })
        console.log(this.graphData)
      }
    );
    
    let mode = localStorage.getItem('mode');
    if(mode == 'true') {
      this.darkmode = true;
    } 
    else if(mode == 'false') {
      this.darkmode = false;
    }
  }

  showData(data: any) {
    console.log(data);
  }

}
