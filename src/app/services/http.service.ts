import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBaseUrl() {  
    return 'http://discover.data.vic.gov.au/api/3/action/datastore_search?resource_id=bc71e010-253a-482a-bdbc-d65d1befe526';  
 }  


  getRecords(payload: any): Observable<any> {
      // convert objec to a query string
      const qs = Object.keys(payload)
      .map(key => `${key}=${payload[key]}`)
      .join('&'); 
      const url = `${this.getBaseUrl()}&${qs}`;
      console.log("here in url", url);

      return this.http.get(url);  
  
  }
}
