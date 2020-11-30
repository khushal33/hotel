import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shaired/dishe';
import { DishService } from '../services/dish.service';
import { Params ,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Comment} from '../shaired/comment';
import { visibility } from '../animations/app.animation';
import { FavoritesService } from '../services/favorites.service';
import { Favorite } from '../shaired/favorite';

import { FavoriteExists } from '../shaired/favoriteExists';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
  animations: [
    visibility()
  ]
})
export class DishDetailsComponent implements OnInit {
   visibility = 'shown';
 
  dish : Dish;
  dishIds: string[];
  prev: string;
  next: string;
  favorite = false;

  commentForm: FormGroup;
  comment: Comment;
 
  @ViewChild('fform') commentFormDirective;

  formErrors = {
   
    'comment': ''
  };

  validationMessages = {
   
    'comment': {
      'required':      'Comments is required.',
    },
  };

  errMess : string;
  constructor(private route:ActivatedRoute , private dishService:DishService,private location:Location,private fb: FormBuilder ,  private favoriteService: FavoritesService ,@Inject('BaseURL') private baseURL) { }
fav: Favorite;
  ngOnInit(): void {


    this.createForm();

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
    .subscribe(dish => {
      this.dish = dish;
      this.setPrevNext(dish._id);
      this.visibility = 'shown';
      this.favoriteService.isFavorite(this.dish._id)
      .subscribe(resp => { console.log(resp); this.favorite = <boolean>resp.exists;},
          err => console.log(err));
    },
    errmess => this.errMess = <any>errmess);




    // this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.errMess = <any>errmess);
    // this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
    // .subscribe(dish => { this.dish = dish ;this.setPrevNext(dish._id); this.visibility = 'shown';
    // this.favoriteService.isFavorite(this.dish._id)
    // .subscribe(resp => { console.log(resp); this.favorite = <boolean>resp.exists; },
    //     err => console.log(err));});

  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goback(){
    this.location.back();
  }


  createForm(){
    this.commentForm = this.fb.group({

      rating:'',
      comment: ['',Validators.required],
     
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
}

onSubmit() {

  this.dishService.postcomment(this.dish._id, this.commentForm.value)
      .subscribe(dish => this.dish = <Dish>dish);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
}

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
    addToFavorites() {
      if (!this.favorite) {
        this.favoriteService.postFavorite(this.dish._id)
          .subscribe(favorites => { console.log(favorites); this.favorite = true; });
      }
    }


}
