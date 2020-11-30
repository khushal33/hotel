import { Injectable } from '@angular/core';
import {Leader } from '../shaired/leader';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable ,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map , catchError} from 'rxjs/operators';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shaired/baseurl';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,private processHTTPMsgService:ProcessHttpmsgService) { }

  getleaders() : Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leaders')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  // getFeatureLeader(): Observable<Leader>{
  //   return of(LEADERS.filter((leader)=> leader.featured)[0]).pipe(delay(2000));
  // }
  getFeatureLeader(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}