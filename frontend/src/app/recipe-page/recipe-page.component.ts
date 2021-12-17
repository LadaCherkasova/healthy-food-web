import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { AuthQuery } from '../services/auth.query';
import { AuthStore } from '../services/auth.store';
import { FavoritesService } from '../services/favorites.service';
import { ModerationService } from '../services/moderation.service';
import { tap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit, OnDestroy {
  readonly isLogged$ = this.authQuery.isLogged$;

  readonly isAdmin$ = this.authQuery.isAdmin$;

  recipe: any = {};

  ingredients: any = [];

  steps: any = [];

  isFavorite: boolean;

  isModerated: boolean;

  readonly recipeId = new Subject<number>();

  readonly subscription = new Subscription();

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private authQuery: AuthQuery,
    private authStore: AuthStore,
    private favoritesService: FavoritesService,
    private moderationService: ModerationService,
  ) {}

  ngOnInit(): void {
    let getRecipeRequest$, isFavoriteRequest$;
    const recipeIdChanges$ = this.recipeId.pipe(
      tap((value) => {
        getRecipeRequest$ = this.recipesService
          .getCertainRecipe(value)
          .subscribe(res => {
            this.recipe = res.recipe;
            this.ingredients = res.ingredients;
            this.steps = res.steps;
            this.isModerated = res.recipe?.recipe_ismoderated;
          });

          if (this.authStore.getValue().isLogged) {
            isFavoriteRequest$ = this.favoritesService
              .isFavorite(value)
              .subscribe(res => {
                this.isFavorite = res;
              });
          }})).subscribe();
    this.subscription.add(recipeIdChanges$);
    this.subscription.add(getRecipeRequest$);
    this.subscription.add(isFavoriteRequest$);

    const parts = this.router.url.split('/');
    this.recipeId.next(parseInt(parts[parts.length - 1]));

    const routerEvents$ = this.router.events.pipe(
      tap((value) => {
        if(value instanceof NavigationEnd ){
          const parts = value.url.split('/');
          const recipeId = parseInt(parts[parts.length - 1]);
          if (recipeId) {
            this.recipeId.next(recipeId);
          }
        }
      })
    ).subscribe();
    this.subscription.add(routerEvents$);
  }

  toggleFavorite(): void {
    const toggleFavoriteRequest$ = this.favoritesService
      .toggleFavorite(this.recipe.recipe_id)
      .subscribe();
    this.isFavorite = !this.isFavorite;
    this.subscription.add(toggleFavoriteRequest$);
  }

  approveRecipe(): void {
    const appriveRecipeRequest$ = this.moderationService
      .approveModeratedRecipe(this.recipe.recipe_id)
      .subscribe();
    this.router.navigateByUrl('moderation');
    this.subscription.add(appriveRecipeRequest$);
  }

  declineRecipe(): void {
    const declineRecipeRequest$ = this.moderationService
      .declineModeratedRecipe(this.recipe.recipe_id)
      .subscribe();
    this.router.navigateByUrl('moderation');
    this.subscription.add(declineRecipeRequest$);
  }

  openAuthorRecipes(): void {
    this.router.navigateByUrl(`profile/${this.recipe.recipe_id}`);
  }

  openPreviousRecipe(): void {
    this.router.navigateByUrl(`recipe/${this.recipe.recipe_previousrecipe}`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


