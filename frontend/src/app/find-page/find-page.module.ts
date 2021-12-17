import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindPageComponent } from './find-page.component';
import { RecipePreviewModule } from '../recipe-preview/recipe-preview.module';
import { FilterShieldModule } from '../filter-shield/filter-shield.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FindPageComponent],
  imports: [
    CommonModule,
    RecipePreviewModule,
    FilterShieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  exports: [FindPageComponent],
})
export class FindPageModule {}
