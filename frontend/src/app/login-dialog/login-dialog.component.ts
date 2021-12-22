import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthStore } from '../services/auth.store';

declare var Userfront: any;

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  constructor(private authStore: AuthStore) {}

  ngOnInit() {
    Userfront.render();
  }

  ngOnDestroy(): void {
    if (Userfront.accessToken()) {
      this.authStore.update({token: Userfront.accessToken()})
    }
  }
}
