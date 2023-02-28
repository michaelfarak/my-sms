import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const GET_API_URL = 'http://localhost:3000/v1/getsms';
const POST_API_URL = 'http://localhost:3000/v1/sendsms';

@Injectable({
  providedIn: 'root'
})
export class SmsServiceService {

  constructor(private http: HttpClient) {}

  sendSms(phone: any, message: any): Observable<any> {
      const headers = new HttpHeaders(
        {
            'Content-Type': 'application/json'
        });
      const body = { phone, message };
      return this.http.post<any>(POST_API_URL, JSON.stringify(body), {headers: headers})
  }

  // getHistory(phone: any) {
  //   return this.http.get<any>(GET_API_URL, {params: phone}).subscribe((response) => { console.log(response); });
  // }

}
