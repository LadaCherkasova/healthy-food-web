import { NgModule } from '@angular/core';
import { RegisterDialogComponent } from './register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [RegisterDialogComponent],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  exports: [RegisterDialogComponent],
})
export class RegisterDialogModule { }
