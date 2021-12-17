import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePreviewComponent } from './recipe-preview.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [RecipePreviewComponent],
  imports: [CommonModule, BrowserModule],
  exports: [RecipePreviewComponent],
})
export class RecipePreviewModule {}
