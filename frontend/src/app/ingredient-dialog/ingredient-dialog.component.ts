import { Component, OnDestroy } from '@angular/core';
import { ModerationService } from '../services/moderation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnDestroy {
  readonly ingredientControl = new FormControl();

  readonly subscription = new Subscription();

  constructor(private moderationService: ModerationService, private dialogRef: MatDialogRef<IngredientDialogComponent>) {}

  sendIngredient(): void {
    const sendIngredientRequest$ = this.moderationService
      .sendIngredientForModeration(this.ingredientControl.value)
      .subscribe();
    this.closeDialog();
    this.subscription.add(sendIngredientRequest$);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
