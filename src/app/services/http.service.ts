import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, pipe, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { queryStringConversion } from '../../utilities/objectToQuery';
import { FilterPayload } from '../interfaces/filterPayload';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBaseUrl() {  
    return 'http://discover.data.vic.gov.au/api/3/action/datastore_search?resource_id=bc71e010-253a-482a-bdbc-d65d1befe526';  
 }  


  // getRecords(payload: FilterPayload): Observable<any> {
  //     // convert objec to a query string
  //     const qs = queryStringConversion(payload);
  //     const url = `${this.getBaseUrl()}&${qs}`;
  //     return this.http.get(url);  
  
  // }
  getRecords(payload: FilterPayload): Observable<any> {
    const qs = queryStringConversion(payload);
    const url = `${this.getBaseUrl()}&${qs}`;
    return this.http.get(url).pipe(
        map((res) => {
           return res;
        }),
        catchError(this.handleError)
    )
  }

  private handleError(error: any): Observable<any> {
      return of(error);
  };
}
