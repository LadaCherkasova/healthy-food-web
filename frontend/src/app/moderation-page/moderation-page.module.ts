import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModerationPageComponent } from './moderation-page.component';
import { RecipePreviewModule } from '../recipe-preview/recipe-preview.module';


@NgModule({
  declarations: [ModerationPageComponent],
  imports: [CommonModule, RecipePreviewModule],
  exports: [ModerationPageComponent],
})
export class ModerationPageModule {}
