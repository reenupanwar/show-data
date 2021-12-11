import { Component, OnInit, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {

  private svg: any;
  private width: number =250;
  private height: number = 250;
  private radius: number = 125;
  private enablePolylines : boolean = true;


  @Input()
  pieChartData: Array<{ "label": string; "value": number; }> = [];
  @Input()
  selectedField!: string;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("here in changes", changes)
    this.setup();
    this.buildSVG();
    this.buildPie()
  }

  setup(): void {
    this.width= 250;
    this.height = 250;
    this.radius = Math.min(this.width, this.height)/2;
  }
  buildSVG(): void {
    this.element.nativeElement.querySelector('.chart').innerHTML = '';

    this.svg = d3
      .select(this.element.nativeElement.querySelector('.chart'))
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr(
        "transform",
        `translate(${this.width/2}, ${this.height/2})`
      );

  }
  buildPie() : void{
    let pie = d3.pie();
    let values = this.pieChartData.map(data=> data.value);
    let arcSelection = this.svg.selectAll('.arc')
    .data(pie(values))
    .enter()
    .append("g")
    .attr("class", "arc");
    this.populatePie(arcSelection)
  }

  populatePie(arcSelection: any): void {
    let innerRadius = this.radius -50;
    let outerRadius = this.radius -10;
    let pieColor = d3.scaleOrdinal(d3.schemeCategory10);
    let arc = d3.arc().innerRadius(0).outerRadius(outerRadius);

    arcSelection.append("path")
    .attr("d", arc)
    .attr("fill", (d: any, index: number) => {
      return pieColor(this.pieChartData[index].label)
    })

    arcSelection.append("text")
    .attr("transform", (d: any) => {
      d.innerRadius = 0;
      d.outerRadius = outerRadius;
      return "translate(" + arc.centroid(d) + ")";
      
    })
    .text((d:any, index: number) =>this.pieChartData[index].label)
    .style("text-anchor", "middle");
    }

}
