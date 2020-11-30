import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuardService } from './services/auth-guard.service';
export const routes:Routes =[
    {path:'home',component:HomeComponent},
    {path:'menu',component:MenuComponent},
    {path:'favorites',component:FavoritesComponent,canActivate:[AuthGuardService]},
    {path:'contact',component:ContactComponent},
    {path:'aboutus',component:AboutusComponent},
    {path:'dishdetail/:id',component:DishDetailsComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'}
   
]