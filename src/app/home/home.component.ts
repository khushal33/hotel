import { Component, OnInit,Inject} from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import {Dish} from '../shaired/dishe';
import { expand } from '../animations/app.animation';
import {Promotion} from '../shaired/promotion';

import {Leader} from '../shaired/leader';
import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dishes : Dish[];
  promotions : Promotion[];
  leaders : Leader[];
  errMess : string;
  constructor(private dishService : DishService,private promotionService : PromotionService, private leaderService:LeaderService,@Inject('BaseURL') private baseURL) { }

  ngOnInit(): void {
     this.dishService.getFeaturedDish().subscribe(dishes => this.dishes = dishes,errmess => this.errMess = <any>errmess);
    this.promotionService.getFeaturePromotion().subscribe(promotions => this.promotions = promotions,errmess => this.errMess = <any>errmess);
     this.leaderService.getFeatureLeader().subscribe(leaders => this.leaders = leaders,errmess => this.errMess = <any>errmess);
  }

}
