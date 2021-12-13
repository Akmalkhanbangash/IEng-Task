import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
 
  baseUrl : string ="https://61ae49b3a7c7f3001786f760.mockapi.io/api/v1/";
  constructor(private httpclient: HttpClient) { 
    
  }

  CreateHeader(){
     
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }
  GetDetails(UrlName: string): Observable<any> {
    let headers = this.CreateHeader();
    let hea = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    var Url = this.baseUrl +UrlName;
    return this.httpclient.get(Url , {headers: hea} );
  }
  post(obj : any ,UrlName: string): Observable<any> {
    let headers = this.CreateHeader();
    let hea = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    var Url = this.baseUrl +UrlName;
    return this.httpclient.post(Url, obj )
  }
  put(obj : any ,UrlName: string): Observable<any> {
    let hea = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    var Url = UrlName;
    return this.httpclient.put(obj,Url , {headers: hea} );
  }
}
