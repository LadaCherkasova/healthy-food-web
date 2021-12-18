import { NgModule } from '@angular/core';
import { LoginDialogComponent } from './login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [LoginDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [LoginDialogComponent],
})
export class LoginDialogModule {}
