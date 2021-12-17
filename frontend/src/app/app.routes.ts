import { Routes } from '@angular/router';
import { FindPageComponent } from './find-page/find-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import { AuthorizationGuard } from './authorization.guard';
import { ModerationPageComponent } from './moderation-page/moderation-page.component';
import { AdminGuard } from './admin.guard';
import { AuthorPageComponent } from './author-page/author-page.component';


export const routes: Routes = [
  {
    path: '',
    component: FindPageComponent,
  },
  {
    path: 'profile',
    component: FavoritePageComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'recipe/:id',
    component: RecipePageComponent,
  },
  {
    path: 'create-recipe',
    component: AddRecipePageComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'moderation',
    component: ModerationPageComponent,
    canActivate: [AuthorizationGuard, AdminGuard]
  },
  {
    path: 'profile/:id',
    component: AuthorPageComponent,
  }
]
