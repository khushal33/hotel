import { Component, OnInit ,Inject} from '@angular/core';
import { from } from 'rxjs';
import { Leader } from '../shaired/leader';
import { LeaderService} from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';
import { PromotionService } from '../services/promotion.service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class AboutusComponent implements OnInit {
  leaders : Leader[];
  errMess : string;
  constructor(private leaderService: LeaderService,@Inject('BaseURL') private baseURL) { }

  ngOnInit(): void {
     this.leaderService.getleaders().subscribe(leaders => this.leaders = leaders,errmess => this.errMess = <any>errmess);
  }

  
}
