import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthQuery } from '../services/auth.query';
import { AuthStore } from '../services/auth.store';
import { Router } from '@angular/router';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

declare var Userfront: any;

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly isLogged$ = this.authQuery.isLogged$;

  readonly token$ = this.authQuery.select('token');

  constructor(
    private matDialog: MatDialog,
    private authQuery: AuthQuery,
    private authStore: AuthStore,
    private router: Router
  ) {
    if (!this.authStore.getValue().isLogged) {
      this.openLoginModal();
    }
  }

  openRegisterModal(): void {
    this.matDialog.open(RegisterDialogComponent);
  }

  openLoginModal(): void {
    this.matDialog.open(LoginDialogComponent);
  }

  logOut(): void {
    this.authStore.update({ isLogged: false, token: undefined });
    Userfront.logout();
    if (!this.router.url.includes('/recipe/')) {
      this.router.navigateByUrl('');
    }
  }
}
