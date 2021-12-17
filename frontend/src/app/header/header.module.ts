import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { LoginDialogModule } from '../login-dialog/login-dialog.module';
import { RegisterDialogModule } from '../register-dialog/register-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, LoginDialogModule, RegisterDialogModule, MatDialogModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
