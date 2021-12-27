import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  historicalPollutionData: any;
  positionData: any;
  currentData: any;
  forcastPollutionGraph: any[] = [];
  historicalPollutionGraph: any[] = [];
  colors: string[] = ['#80fc32', '#17a6ff', '#ffff17', '#ff1797', '#17ffd1', '#ff9e17', '#b617ff', '#ff1717'];
  constructor(private _mapPopupService: MapService, private router: Router) { }

  ngOnInit(): void {

    this.lat = localStorage.getItem('lat') || '';
    this.lng = localStorage.getItem('lng') || '';
    if(this.lat == '' || this.lng == '') {
      this.router.navigate(['']);
    }
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
      () => {
        
      }
    );

    this._mapPopupService.getCurrentPollutionData(this.lat, this.lng).subscribe(
      responseData => {
        this.currentPollutionData = responseData
        this.currentData = Object.keys(this.currentPollutionData.list[0].components);
        this.currentData = this.currentData.map((key: any) => {
          return {
            name: key,
            value: this.currentPollutionData.list[0].components[key]
          }
        })
        console.log(this.currentData);
      },
      responseError => console.log(responseError),
      () => {
        
      }
    );
    
    this._mapPopupService.getForcastData(this.lat, this.lng).subscribe(
      responseData => {
        this.forcastPollutionData = responseData;
        this.forcastPollutionGraph = this.extractData(this.forcastPollutionData);
      },
      responseError => console.log(responseError),
      () => {
        
      }
    );

    this._mapPopupService.getHistoricalData(this.lat, this.lng).subscribe(
      responseData => {
        this.historicalPollutionData = responseData;
        this.historicalPollutionGraph = this.extractData(this.historicalPollutionData);
      },
      responseError => console.log(responseError),
      () => {
        
      }
    );

  }

  extractData(apiResponse: any) {
    let components = Object.keys(this.forcastPollutionData.list[0].components);
    let extractedData: any[] = [];
    for (let i = 0; i < components.length; i++) {
      let componentData: {
        name: string,
        data: number[],
        date: string[]
      } = {
        name: components[i],
        data: [],
        date: []
      };
      apiResponse.list.forEach((element: any) => {
        if(!componentData.date.includes(new Date(element.dt * 1000).toDateString().slice(4))) {
          componentData.data.push(element.components[components[i]]);
          componentData.date.push(new Date(element.dt * 1000).toDateString().slice(4));
        }
      });
      extractedData.push({
        ...componentData,
        color: this.colors[i]
      });
    }
    return extractedData;
    
  }

  changeMode(){
    this.darkmode = !this.darkmode;
    if(this.darkmode)
      localStorage.setItem('mode', 'true');
    else
      localStorage.setItem('mode', 'false');
  }

}
