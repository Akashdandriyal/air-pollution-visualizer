import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedDataComponent } from './detailed-data/detailed-data.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'detailedData', component: DetailedDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
