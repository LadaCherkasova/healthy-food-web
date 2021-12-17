import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorPageComponent } from './author-page.component';
import { RecipePreviewModule } from '../recipe-preview/recipe-preview.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AuthorPageComponent],
  imports: [CommonModule, RecipePreviewModule, RouterModule],
  exports: [AuthorPageComponent],
})
export class AuthorPageModule {}
