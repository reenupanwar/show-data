import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsComponent } from './charts.component';
const chartData = [
  {
    _id: 1,
    LGA: 'Alpine (S)',
    lga_pid: 'VIC242',
    population: '12814',
    active: '7',
    cases: '11',
    rate: '54.6',
    new: '1',
    band: '3',
    LGADisplay: 'Alpine',
    data_date: '11/12/2021',
    file_processed_date: '2021-12-12',
  },
  {
    _id: 2,
    LGA: 'Ararat (RC)',
    lga_pid: 'VIC220',
    population: '11845',
    active: '28',
    cases: '55',
    rate: '236.4',
    new: '1',
    band: '5',
    LGADisplay: 'Ararat',
    data_date: '11/12/2021',
    file_processed_date: '2021-12-12',
  },
];

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ChartsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    component.chartData = [];
    component.selectedField = 'active';
    fixture.detectChanges();
    component.ngOnChanges({
      chartData: new SimpleChange(null, chartData, false),
      selectedField: new SimpleChange(null, 'active', false),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call when data chengesss', () => {
    component.chartData = chartData;
    component.ngOnChanges({
      chartData: new SimpleChange(null, chartData, false),
      selectedField: new SimpleChange(null, 'active', false),
    });
    const pieChartData = [
      { label: 'Alpine (S)', value: 7 },
      { label: 'Ararat (RC)', value: 28 },
    ];
    expect(component.pieChartData).toEqual(pieChartData);
  });
});
