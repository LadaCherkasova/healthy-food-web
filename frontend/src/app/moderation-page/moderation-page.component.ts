import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModerationService } from '../services/moderation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'moderation-page',
  templateUrl: './moderation-page.component.html',
  styleUrls: ['./moderation-page.component.scss']
})
export class ModerationPageComponent implements OnInit, OnDestroy {
  moderatedRecipes: any = [];

  moderatedIngredients: any = [];

  readonly subscription = new Subscription();

  constructor(private moderationService: ModerationService, private router: Router) {}

  ngOnInit(): void {
    const getRecipesRequest$ = this.moderationService
      .getModeratedRecipes()
      .subscribe(res => this.moderatedRecipes = res);
    this.subscription.add(getRecipesRequest$);

    const getIngredientsRequest$ = this.moderationService
      .getModeratedIngredients()
      .subscribe(res => this.moderatedIngredients = res);
    this.subscription.add(getIngredientsRequest$);
  }

  openRecipe(id: number): void {
    this.router.navigateByUrl(`recipe/${id}`);
  }

  approveIngredient(ingredient: any): void {
    const approveRequest$ = this.moderationService
      .approveModeratedIngredient(ingredient.ingredient_id)
      .subscribe();
    this.removeFromIngredients(ingredient);
    this.subscription.add(approveRequest$);
  }

  declineIngredient(ingredient: any): void {
    const declineRequest$ = this.moderationService
      .declineModeratedIngredient(ingredient.ingredient_id)
      .subscribe();
    this.removeFromIngredients(ingredient);
    this.subscription.add(declineRequest$);
  }

  removeFromIngredients(ingredient: any): void {
    const index = this.moderatedIngredients.indexOf(ingredient);
    this.moderatedIngredients = this.moderatedIngredients.slice(0, index).concat(this.moderatedIngredients.slice(index + 1));
  }

  removeRecipe(recipe: any): void {
    const index = this.moderatedRecipes.indexOf(recipe);
    this.moderatedRecipes = this.moderatedRecipes.slice(0, index).concat(this.moderatedRecipes.slice(index + 1));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
