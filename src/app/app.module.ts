import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './services/map/map.service';
import { HttpClientModule } from '@angular/common/http';
import { MapPopupComponent } from './map-popup/map-popup.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailedDataComponent } from './detailed-data/detailed-data.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapPopupComponent,
    DetailedDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
