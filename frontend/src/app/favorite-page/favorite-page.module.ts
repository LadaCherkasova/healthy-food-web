import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritePageComponent } from './favorite-page.component';
import { RecipePreviewModule } from '../recipe-preview/recipe-preview.module';


@NgModule({
  declarations: [FavoritePageComponent],
  imports: [CommonModule, RecipePreviewModule],
  exports: [FavoritePageComponent],
})
export class FavoritePageModule {}
