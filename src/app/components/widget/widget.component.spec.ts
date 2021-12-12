import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { WidgetComponent } from './widget.component';
import { queryStringConversion } from '../../../utilities/objectToQuery';
import { Observable, of } from 'rxjs';

class MockHttpService {

  getBaseUrl() {  
    return 'http://discover.data.vic.gov.au/api/3/action/datastore_search?resource_id=bc71e010-253a-482a-bdbc-d65d1befe526';  
 }  
  getRecords(payload: any): Observable<any> {
      return  of({
      "success": true,
      "result": {
      }}); 
  
  }

}
const res = {success: true, result: {records : [], fields: [], total: 0}}
const errorRes = {success: false}

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let httpService: HttpService;
  let fixture: ComponentFixture<WidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TableModule, DropdownModule, FormsModule,InputTextModule, RouterTestingModule], 
      declarations: [ WidgetComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{
          provide: httpService, useClass: MockHttpService
      }]
    })
    .compileComponents();
    httpService = TestBed.inject(HttpService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    component.showChart = false;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onChange called', () => {
    component.onChange({})
    component.onChange({value: "active"})
  });

  it('loadCustomers called', () => {
    const spy = spyOn(httpService, 'getRecords').and.returnValue(of(res))
    component.getEventValue({target: {value: "sig"}});
    component.loadCustomers({sortField: "rate",sortOrder: 1, rows: 10, first: 0, globalFilter: "LGA"});
    expect(spy).toHaveBeenCalled();
  })

  it('loadCustomers called when column alreay exist', () => {
    component.columns = [{
      id: 'LGA',
      type: "text"
    }]
    const spy = spyOn(httpService, 'getRecords').and.returnValue(of(res))
    component.loadCustomers({sortField: "rate",sortOrder: -1, rows: 10, first: 0, globalFilter: "LGA"});
    expect(spy).toHaveBeenCalled();
  })
  it('loadCustomers when error occured', () => {
    const spy = spyOn(httpService, 'getRecords').and.returnValue(of(errorRes))
    component.loadCustomers({sortField: "rate",sortOrder: -1, rows: 10, first: 0, globalFilter: "LGA"});
    expect(component.isApiError).toBeFalsy;
  })

});
