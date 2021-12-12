import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as d3 from 'd3';

import { PieChartComponent } from './pie-chart.component';

const pieChartData = [
  { label: 'Alpine (S)', value: 7 },
  { label: 'Ararat (RC)', value: 28 },
];

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.pieChartData = pieChartData;
    component.selectedField = 'active';
    component.ngOnChanges({
      pieChartData: new SimpleChange(null, pieChartData, false),
      selectedField: new SimpleChange(null, 'active', false),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should  have svg element', () => {
    const element = d3.select('.chart').select('svg').node();
    expect(element).toBeDefined();
  });
  it('ng Onchanges', () => {
    component.pieChartData = [
      { label: 'Alpine (S)', value: 7 },
      { label: 'Ararat (RC)', value: 28 },
    ];
    component.selectedField = 'cases';
    component.ngOnChanges({});
    const childDebugEle = fixture.debugElement.query(By.css('.chart'));
    const element =
      childDebugEle.nativeElement.childNodes[0].querySelector('path');
    element.dispatchEvent(new MouseEvent('mouseover'));
    element.dispatchEvent(new MouseEvent('mouseout'));
    expect(childDebugEle.nativeElement.childNodes[0]).toBeDefined();
  });
});
