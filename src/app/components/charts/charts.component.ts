import {Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnChanges{

  @Input() chartData: any;
  @Input()
  selectedField!: string;
  pieChartData: Array<{label: string, value: number}>  = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.createChartData();
  }
  
  createChartData() {
    this.pieChartData = [];
    this.chartData.map((record: any) => {
      if(+record[this.selectedField] != 0) {
       this.pieChartData.push({"label": record['LGA'], "value": +record[this.selectedField]})
      }

    })
  }

}
