import { NgModule } from '@angular/core';
import { RegisterDialogComponent } from './register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [RegisterDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [RegisterDialogComponent],
})
export class RegisterDialogModule { }
