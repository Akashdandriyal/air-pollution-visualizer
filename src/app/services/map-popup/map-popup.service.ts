import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MapPopupService {

  constructor(private http: HttpClient) { }

  getCurrentPollutionData(lat: string, lng: string): Observable<Object> {
    let data: any = this.http.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${environment.pollutionApi}`)
    console.log(data);
    return data;
  }

  getPosition(lat: string, lng: string): Observable<Object> {
    let data = this.http.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${environment.pollutionApi}`)
    console.log(data);
    return data;
  }
}
