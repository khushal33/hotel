import { Injectable } from '@angular/core';
import { Favorite } from '../shaired/favorite';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable ,of } from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shaired/baseurl';
import { AuthService } from './auth.service';
import { FavoriteExists } from '../shaired/favoriteExists'; 
import { Dish } from '../shaired/dishe';
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http:HttpClient,private processHTTPMsgService: ProcessHttpmsgService,public auth: AuthService) { }

  getFavorites(): Observable<Favorite> {
    if (!this.auth.isLoggedIn()) {
      return null;
    }
    return this.http.get<Favorite>(baseURL + 'favorites')
     .pipe( catchError(error => this.processHTTPMsgService.handleError(error)));
    
  }

  postFavorites(dishids: any) {
    return this.http.post(baseURL + 'favorites/', dishids)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  isFavorite(id: string): Observable<FavoriteExists> {
    if (!this.auth.isLoggedIn()) {
      return of({ exists: false, favorites: null });
    }
    return this.http.get<FavoriteExists>(baseURL + 'favorites/' + id)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  postFavorite(id: string) {
    return this.http.post(baseURL + 'favorites/' + id,{})
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  deleteFavorite(id: string) {
    return this.http.delete(baseURL + 'favorites/' + id)
    .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }
}
