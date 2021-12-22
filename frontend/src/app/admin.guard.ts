import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ADMIN_EMAIL } from './admin-info';

declare var Userfront: any;

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  canActivate(): Observable<boolean> | boolean{
    return of(Userfront.user.email === ADMIN_EMAIL);
  }
}
