import {
  Component,
  OnInit,
  ElementRef,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {
  private svg: any;
  private width: number = 250;
  private height: number = 250;
  private radius: number = 125;
  @Input()
  pieChartData: Array<{ label: string; value: number }> = [];
  @Input()
  selectedField!: string;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.setup();
    this.buildSVG();
    this.buildPie();
  }

  setup(): void {
    this.width = 750;
    this.height = 450;
    this.radius = Math.min(this.width, this.height) / 2;
  }
  buildSVG(): void {
    this.element.nativeElement.querySelector('.chart').innerHTML = '';

    this.svg = d3
      .select(this.element.nativeElement.querySelector('.chart'))
      .append('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  }

  buildPie(): void {
    let pie = d3.pie();
    let values = this.pieChartData.map((data, index) => data.value);
    console.log("here in values", values);
    let arcSelection = this.svg
      .selectAll('.arc')
      .data(pie(values))
      .enter()
      .append('g')
      .attr('class', 'arc');
    this.populatePie(arcSelection);
  }

  populatePie(arcSelection: any): void {
    let innerRadius = this.radius - 50;
    let outerRadius = this.radius - 10;
    let pieColor = d3.scaleOrdinal(d3.schemeCategory10);
    let arc = d3.arc().innerRadius(0).outerRadius(outerRadius);
    const tooltip = d3.select(this.element.nativeElement.querySelector('#toolTip'))

    arcSelection
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any, index: number) => {
        return pieColor(this.pieChartData[index].label);
      })
      .on("mouseover", (event:any, d: any) =>{
        const key =  this.pieChartData.filter((data) => data.value == d.value);
        const toolTipText =  key[0].label + " : " + d.value; //this.pieChartData[index].label
        tooltip
        .style("opacity", 1)
        .style("display","block")
        .text(toolTipText)
        .style("left", (d3.pointer(event)[0]> 0 ? d3.pointer(event)[0] +30: 0) + "px")
        .style("top", (d3.pointer(event)[1]> 0 ? d3.pointer(event)[1] +30: 0) + "px")
      })
     .on("mouseout",function(){tooltip.style("display","none");})

      
    arcSelection
      .append('text')
      .attr('transform', (d: any) => {
        d.innerRadius = 0;
        d.outerRadius = outerRadius-50;
        return 'translate(' + arc.centroid(d) + ')';
      })  
      .text((d: any, index: number) => this.pieChartData[index].label)
      .style('text-anchor', 'middle')
      
  }


}
