import { NgModule } from '@angular/core';
import { AddRecipePageComponent } from './add-recipe-page.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [AddRecipePageComponent],
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatDialogModule, PipesModule],
  exports: [AddRecipePageComponent],
})
export class AddRecipePageModule {}
