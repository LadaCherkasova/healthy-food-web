import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit, OnDestroy {
  recipes: any = [];

  userName: string;

  readonly subscription = new Subscription();

  constructor(private router: Router, private recipesService: RecipesService) {}

  ngOnInit(): void {
    const parts = this.router.url.split('/');
    const recipeId = parseInt(parts[parts.length - 1]);

    const getAuthorRecipesRequest$ = this.recipesService
      .getAuthorRecipes(recipeId)
      .subscribe(res => {
        this.recipes = res.recipes;
        this.userName = res.user_name.user_name;
      });
    this.subscription.add(getAuthorRecipesRequest$);
  }

  openRecipe(id: number): void {
    this.router.navigateByUrl(`recipe/${id}`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
