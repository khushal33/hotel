import { Injectable } from '@angular/core';
import {Feedback } from '../shaired/feedback';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable  } from 'rxjs';

import {  catchError , map, subscribeOn } from 'rxjs/operators';
import { HttpClient ,HttpEventType,HttpHeaders, HttpResponse } from '@angular/common/http';
import { baseURL } from '../shaired/baseurl';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,private processHTTPMsgService: ProcessHttpmsgService) { }
  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  postFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedbacks' ,feedback, httpOptions)
       .pipe(catchError( this.processHTTPMsgService.handleError));
    
  }
}
