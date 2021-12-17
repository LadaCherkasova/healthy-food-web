import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthStore } from '../services/auth.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnDestroy {
  readonly nameControl = new FormControl();

  readonly emailControl = new FormControl();

  readonly passwordControl = new FormControl();

  readonly subscription = new Subscription();

  showError = false;

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private authService: AuthService,
    private authStore: AuthStore,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  register(): void {
    const registerRequest$ = this.authService
      .register(this.nameControl.value.trim(), this.passwordControl.value.trim(), this.emailControl.value.trim())
      .subscribe(res => {
        if (res.token) {
          this.authStore.update({
            token: res.token,
            isLogged: true,
            isAdmin: res.isAdmin,
          });
          this.closeDialog();
        }
      }, error => {
        if (error.status === 401) {
          this.showError = true;
        }
      });
    this.subscription.add(registerRequest$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
