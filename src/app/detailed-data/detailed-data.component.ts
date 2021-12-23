import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-detailed-data',
  templateUrl: './detailed-data.component.html',
  styleUrls: ['./detailed-data.component.css']
})
export class DetailedDataComponent implements OnInit {

  lat: string = '';
  lng: string = '';
  darkmode: boolean = false;
  currentPollutionData: any;
  forcastPollutionData: any;
  positionData: any;
  currentData: any;
  forcastPollutionGraph: any[] = [];
  colors: string[] = ['#80fc32', '#17a6ff', '#ffff17', '#ff1797', '#17ffd1', '#ff9e17', '#b617ff', '#ff1717'];
  constructor(private _mapPopupService: MapService) { }

  ngOnInit(): void {

    this.lat = localStorage.getItem('lat') || '';
    this.lng = localStorage.getItem('lng') || '';
    let mode = localStorage.getItem('mode');
    if(mode == 'true') {
      this.darkmode = true;
    } 
    else if(mode == 'false') {
      this.darkmode = false;
    }

    this._mapPopupService.getPosition(this.lat, this.lng).subscribe(
      responseData => this.positionData = responseData,
      responseError => console.log(responseError),
      // () => this.showData(this.positionData)
    );

    this._mapPopupService.getCurrentPollutionData(this.lat, this.lng).subscribe(
      responseData => this.currentPollutionData = responseData,
      responseError => console.log(responseError),
      () => {
        // this.showData(this.pollutionData)
        this.currentData = Object.keys(this.currentPollutionData.list[0].components);
        this.currentData = this.currentData.map((key: any) => {
          return {
            name: key,
            value: this.currentPollutionData.list[0].components[key]
          }
        })
        console.log(this.currentData)
      }
    );
    
    this._mapPopupService.getForcastData(this.lat, this.lng).subscribe(
      responseData => this.forcastPollutionData = responseData,
      responseError => console.log(responseError),
      () => {
        let components = Object.keys(this.forcastPollutionData.list[0].components);
        for (let i = 0; i < components.length; i++) {
          // let componentData = this.forcastPollutionData.list.map((element: any) => {
          //   return element.components[components[i]]
          // });
          // this.forcastPollutionGraph.push({
          //   name: components[i],
          //   data: componentData
          // })
          let componentData: {
            name: string,
            data: number[],
            date: string[]
          } = {
            name: components[i],
            data: [],
            date: []
          };
          this.forcastPollutionData.list.forEach((element: any) => {
            if(!componentData.date.includes(new Date(element.dt * 1000).toDateString())) {
              componentData.data.push(element.components[components[i]]);
              componentData.date.push(new Date(element.dt * 1000).toDateString());
            }
          });
          this.forcastPollutionGraph.push({
            ...componentData,
            color: this.colors[i]
          });
        }
        console.log(this.forcastPollutionGraph);
      }
    )

  }

}
