import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './services/map/map.service';
import { HttpClientModule } from '@angular/common/http';
import { MapPopupComponent } from './map-popup/map-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailedDataComponent } from './detailed-data/detailed-data.component';
import { PollutionGraphComponent } from './pollution-graph/pollution-graph.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapPopupComponent,
    DetailedDataComponent,
    PollutionGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
