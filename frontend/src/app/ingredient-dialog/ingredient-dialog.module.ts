import { NgModule } from '@angular/core';
import { IngredientDialogComponent } from './ingredient-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [IngredientDialogComponent],
  imports: [MatDialogModule, ReactiveFormsModule],
  exports: [IngredientDialogComponent],
})
export class IngredientDialogModule {}
