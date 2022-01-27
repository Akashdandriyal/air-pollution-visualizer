import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getCurrentPollutionData(lat: string, lng: string): Observable<Object> {
    let data: any = this.http.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${environment.pollutionApi}`)
    console.log(data);
    return data;
  }

  getPosition(lat: string, lng: string): Observable<Object> {
    let data: any = this.http.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${environment.pollutionApi}`)
    console.log(data);
    return data;
  }

  getForcastData(lat: string, lng: string): Observable<Object> {
    let data: any = this.http.get(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lng}&limit=1&appid=${environment.pollutionApi}`)
    console.log(data);
    return data;
  }

  getHistoricalData(lat: string, lng: string): Observable<Object> {
    let date = new Date().getTime();
    let startDate = Math.round((date-518400000) / 1000);
    let endDate = Math.round(date / 1000);
    console.log("date " + date)
    let data: any = this.http.get(`https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lng}&start=${startDate}&end=${endDate}&appid=${environment.pollutionApi}`)
    console.log(data);
    return data;
  }

  getLocations(searchText: string): Observable<Object> {
    let data = this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?limit=10&types=postcode%2Caddress%2Cregion%2Cdistrict%2Cneighborhood%2Clocality%2Ccountry%2Cpoi%2Cplace&autocomplete=true&access_token=${environment.mapToken}`)
    console.log(data);
    return data;
  }
}
