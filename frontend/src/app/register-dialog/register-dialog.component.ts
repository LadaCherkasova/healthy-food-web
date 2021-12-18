import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthStore } from '../services/auth.store';

declare var Userfront: any;

@Component({
  selector: 'register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
  constructor(
    private authStore: AuthStore,
  ) {}

  ngOnInit() {
    Userfront.render();
  }

  ngOnDestroy(): void {
    if (Userfront.accessToken()) {
      this.authStore.update({token: Userfront.accessToken()})
    }
  }
}
