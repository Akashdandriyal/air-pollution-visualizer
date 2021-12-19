import { Component, Input, OnInit } from '@angular/core';
import { MapPopupService } from '../services/map-popup/map-popup.service';

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
  constructor(private _mapPopupService: MapPopupService) { }

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
        let newData: any= []
        this.graphData = this.graphData.map((key: any) => {
          return {
            name: key,
            value: this.pollutionData.list[0].components[key]
          }
        })
        console.log(this.graphData)
      }
    );
    
  }

  showData(data: any) {
    console.log(data);
  }

  // getColor(data: any): any {
  //   if()
  // }

}
