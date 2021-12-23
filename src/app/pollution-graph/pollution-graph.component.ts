import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-pollution-graph',
  templateUrl: './pollution-graph.component.html',
  styleUrls: ['./pollution-graph.component.css']
})
export class PollutionGraphComponent implements OnInit {

  @Input() graphData: any;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
    this.lineChartData.push(
      { data: this.graphData.data, label: this.graphData.name }
    )

    this.lineChartLabels = this.graphData.date;

    this.lineChartColors.push(
      {
        borderColor: 'gray',
        backgroundColor: this.graphData.color,
      }
    )
  }

}
