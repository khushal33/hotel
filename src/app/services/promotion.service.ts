import { Injectable } from '@angular/core';
import {Promotion} from '../shaired/promotion';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable ,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map , catchError} from 'rxjs/operators';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shaired/baseurl';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,private processHTTPMsgService: ProcessHttpmsgService) { }


  
  // getFeaturePromotion(): Observable<Promotion>{
  //   return of(PROMOTIONS.filter((promotion)=> promotion.featured)[0]).pipe(delay(2000));
  // }
  getFeaturePromotion(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
