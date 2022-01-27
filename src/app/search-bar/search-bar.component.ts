import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchResults: any;
  searchText: string = '';
  timeout: any;
  @Output() locationSelectEvent = new EventEmitter<any>();
  constructor(private _mapPopupService: MapService) { }

  ngOnInit(): void {
  }

  handleChange(e: any): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this._mapPopupService.getLocations(e.target.value).subscribe(
        responseData => this.searchResults = responseData,
        responseError => console.log(responseError),
        () => console.log('Location function executed')
      );
    }, 600);
  }

  clearSearchBar(): void {
    this.searchText = '';
    this.searchResults.features.length = 0;
  }

  searchedLocation(location: any): void{
    console.log(location);
    this.searchText = location.place_name;
    this.locationSelectEvent.emit(location);
    this.searchResults.features.length = 0;
  }
}
