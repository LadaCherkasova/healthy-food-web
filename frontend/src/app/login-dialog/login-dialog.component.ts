import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AuthStore } from '../services/auth.store';
import { MatDialogRef } from '@angular/material/dialog';

declare var Userfront: any;

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  constructor(
    private authStore: AuthStore,
    private dialogRef: MatDialogRef<LoginDialogComponent>
    ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if ((event.target as HTMLDivElement).classList.value === 'cdk-global-overlay-wrapper') {
      this.dialogRef.close();
    }
  }

  ngOnInit() {
    Userfront.render();
  }

  ngOnDestroy(): void {
    if (Userfront.accessToken()) {
      this.authStore.update({token: Userfront.accessToken()})
    }
  }
}
