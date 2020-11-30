import { Injectable } from '@angular/core';
import { Dish } from '../shaired/dishe';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable ,of } from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shaired/baseurl';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,private processHTTPMsgService: ProcessHttpmsgService ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL  + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish._id)))
    .pipe(catchError(error => error));
  }
   
  postcomment(dishId: string, comment: any): Observable<Dish> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'bearer ' + this.token.getToken()
    //   })
    // };
    
    return this.http.post<Dish>(baseURL + 'dishes/' + dishId + '/comments', comment)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
