import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss']
})
export class FindPageComponent implements OnInit, OnDestroy {
  readonly titleControl = new FormControl();

  readonly timeControl = new FormControl();

  readonly veganControl = new FormControl();

  readonly ingredientSearchControl = new FormControl();

  ingredients: any = [];

  currentIngredients: any = [];

  types: any = [];

  recipes: any = [];

  showFindIcon = false;

  shields: any = {
    title: undefined,
    ingredients: [],
    type: undefined,
    time: undefined,
    isVegan: undefined,
  };

  readonly subscription = new Subscription();

  constructor(
    private settingsService: SettingsService,
    private recipesService: RecipesService,
    private router: Router,
  ) {};

  ngOnInit(): void {
    const getIngredientsRequest$ = this.settingsService
      .getAvailableIngredients()
      .subscribe((response) => {
        this.ingredients = response;
        this.currentIngredients = response;
      });
    this.subscription.add(getIngredientsRequest$);

    const getTypesRequest$ = this.settingsService
      .getDishesTypes()
      .subscribe(response => this.types = response);
    this.subscription.add(getTypesRequest$);

    const timeControlChanges$ = this.timeControl.valueChanges.pipe(
      tap(time => this.shields.time = time !== '' ? time : undefined)
    ).subscribe();
    this.subscription.add(timeControlChanges$);

    const veganControlChanges$ = this.veganControl.valueChanges.pipe(
      tap(isVegan => this.shields.isVegan = isVegan ? true : undefined)
    ).subscribe();
    this.subscription.add(veganControlChanges$);

    const ingredientSearchControlChanges$ = this.ingredientSearchControl.valueChanges.pipe(
      tap((value) => {
        this.currentIngredients = this.ingredients.filter(
          ingredient => ingredient.ingredient_name.toLowerCase().includes(value.toLowerCase())
        )
      })).subscribe();
    this.subscription.add(ingredientSearchControlChanges$);

    const getRecipesRequest$ = this.recipesService
      .getAvailableRecipes()
      .subscribe(res => this.recipes = res);
    this.subscription.add(getRecipesRequest$);

    const titleControlChanges$ = this.titleControl.valueChanges.pipe(
      tap((value) => {
        this.shields.title = value === '' ? undefined : value;
        this.getFilteredRecipes(false);
      })
    ).subscribe();
    this.subscription.add(titleControlChanges$);
  }

  toggleInputIcon(): void {
    this.showFindIcon = !this.showFindIcon;
  }

  toggleIngredient(ingredient: string): void {
    this.ingredientSearchControl.setValue('');
    const id2 = this.findIdOfIngredient(ingredient);
    const id = this.findIdOfShield(ingredient);
    if (id !== -1) {
      delete this.ingredients[id2].checked;
      this.shields.ingredients = this.shields.ingredients.slice(0, id).concat(this.shields.ingredients.slice(id + 1));
    } else {
      this.ingredients[id2].checked = true;
      this.shields.ingredients.push({
        title: ingredient
      });
    }
  }

  toggleType(type: string): void {
    if (this.shields.type) {
      this.shields.type = undefined
    } else {
      this.shields.type = type;
    }
  }

  deleteWhiteShield(isTime: boolean): void {
    isTime
      ? this.timeControl.setValue('')
      : this.veganControl.setValue(false);
  }

  deleteBlueShield(ingredient: string): void {
    const id = this.findIdOfShield(ingredient);
    this.shields.ingredients = this.shields.ingredients.slice(0, id).concat(this.shields.ingredients.slice(id + 1));
    const id2 = this.findIdOfIngredient(ingredient);
    delete this.ingredients[id2].checked;
  }

  deleteRedShield(): void {
    this.shields.type = undefined;
  }

  getFilteredRecipes(shouldToggle: boolean): void {
    if (shouldToggle) {
      this.toggleInputIcon();
    }
    const getFilteredRecipesRequest$ = this.recipesService
      .getFilteredRecipes(this.shields)
      .subscribe(res => this.recipes = res);
    this.subscription.add(getFilteredRecipesRequest$);
  }

  openRecipe(id: number): void {
    this.router.navigateByUrl(`recipe/${id}`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private findIdOfShield(value: string): number {
    const foundShield = this.shields.ingredients.find(
      shield => shield.title === value
    );
    return this.shields.ingredients.indexOf(foundShield);
  }

  private findIdOfIngredient(value: string): number {
    const foundIngredient = this.ingredients.find(
      item => item.ingredient_name === value
    );
    return this.ingredients.indexOf(foundIngredient);
  }
}
