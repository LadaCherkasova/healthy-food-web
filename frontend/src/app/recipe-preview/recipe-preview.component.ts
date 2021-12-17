import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthQuery } from '../services/auth.query';
import { FavoritesService } from '../services/favorites.service';
import { AuthStore } from '../services/auth.store';
import { ModerationService } from '../services/moderation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss']
})
export class RecipePreviewComponent implements OnInit, OnDestroy {
  @Input()
  image: string;

  @Input()
  time: number;

  @Input()
  title: string;

  @Input()
  type: string;

  @Input()
  description: string;

  @Input()
  isFavorite: boolean;

  @Input()
  isVegan: boolean;

  @Input()
  recipeId: number;

  @Input()
  isModerated: boolean;

  @Output()
  hide = new EventEmitter<void>();

  readonly isLogged$ = this.authQuery.isLogged$;

  readonly subscription = new Subscription();

  constructor(
    private authQuery: AuthQuery,
    private favoritesService: FavoritesService,
    private authStore: AuthStore,
    private moderationService: ModerationService,
  ) {}

  ngOnInit(): void {
    if (this.authStore.getValue().isLogged) {
      const isFavoriteRequest$ = this.favoritesService
        .isFavorite(this.recipeId)
        .subscribe(res => {
          this.isFavorite = res;
        });
      this.subscription.add(isFavoriteRequest$);
    }
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    const toggleFavoriteRequest$ = this.favoritesService
      .toggleFavorite(this.recipeId)
      .subscribe();
    this.isFavorite = !this.isFavorite;
    this.subscription.add(toggleFavoriteRequest$);
  }

  approveRecipe(event: Event): void {
    event.stopPropagation();
    const approveRecipeRequest$ = this.moderationService
      .approveModeratedRecipe(this.recipeId)
      .subscribe();
    this.hide.emit();
    this.subscription.add(approveRecipeRequest$);
  }

  declineRecipe(event: Event): void {
    event.stopPropagation();
    const declineRecipeRequest$ = this.moderationService
      .declineModeratedRecipe(this.recipeId)
      .subscribe();
    this.hide.emit();
    this.subscription.add(declineRecipeRequest$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
