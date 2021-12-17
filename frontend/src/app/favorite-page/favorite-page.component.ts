import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'favourite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  showFavorites = true;

  favorites: any = [];

  ownRecipes: any = [];

  readonly subscription = new Subscription();

  constructor(
    private favoritesService: FavoritesService,
    private recipesService: RecipesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const getFavoritesRequest$ = this.favoritesService
      .getFavorites()
      .subscribe(res => this.favorites = res);
    this.subscription.add(getFavoritesRequest$);

    const getOwnRecipesRequest$ = this.recipesService
      .getOwnRecipes()
      .subscribe(res => this.ownRecipes = res);
    this.subscription.add(getOwnRecipesRequest$);
  }


  toggleTab(): void {
    this.showFavorites = !this.showFavorites;
  }

  openRecipe(id: number): void {
    this.router.navigateByUrl(`recipe/${id}`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
