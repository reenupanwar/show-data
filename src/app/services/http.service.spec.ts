import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { queryStringConversion } from '../../utilities/objectToQuery';

import { HttpService } from './http.service';
const url =
  'http://discover.data.vic.gov.au/api/3/action/datastore_search?resource_id=bc71e010-253a-482a-bdbc-d65d1befe526';

describe('HttpserviceService', () => {
  let httpTestingController: HttpTestingController;
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('check url', () => {
    expect(service.getBaseUrl()).toBe(url);
  });
  it('should return records by calling once', () => {
    const payload = { limit: 10 };
    // let successRes;
    // service.getRecords(payload).subscribe((res) => {
    //   console.log("reqqqq", res);
    //   successRes = res;

    // });
    // expect(successRes).toBeDefined();
    //expect(successRes.success).toBe(true);

    let result: any;
    service.getRecords(payload).subscribe((res) => {
      result = res;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}&limit=10`,
    });

    const apiRes = {};

    req.flush(apiRes);

    expect(result).toEqual(apiRes);
  });
  it('handle error function', () => {
      let error: any;
      service.getRecords({}).subscribe(e => {
        error = e;
      });
      const req = httpTestingController.expectOne({
        method: 'GET',
        url: `${url}&`,
      });
      req.flush({
        success: false,
        statusText: "Network error"
      });
      expect(error.success).toBeFalsy();
  });
});
