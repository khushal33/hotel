import { Component, OnInit ,Inject} from '@angular/core';
import { Favorite } from '../shaired/favorite';
import { FavoritesService } from '../services/favorites.service';
import { flyInOut , expand} from '../animations/app.animation';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class FavoritesComponent implements OnInit {
 public destroyed = new Subject<any>();
  favorites: Favorite;
  fav;

  delete: boolean;
  errMess: string;
mySubscription:any;
  constructor(private favoriteService: FavoritesService , private router:Router,@Inject('BaseURL') private baseURL) { 
    // this.router.routeReuseStrategy.shouldReuseRoute = function()
    // {
    //   return false;
    // }
  }

  ngOnInit() {

      this.favoriteService.getFavorites().toPromise()
      .then((favorites)=>{
        this.favorites = favorites;
         console.log(this.favorites.dishes);
       });

   
     
  }
  
   
  

  deleteFavorite(id:string) {
  
    this.favoriteService.deleteFavorite(id)
      .subscribe(favorites => this.ngOnInit(),
        errmess => this.errMess = <any>errmess);
        console.log('Deleting Dish ' + id);
      
        this.delete = false;
         
        
  }
}
