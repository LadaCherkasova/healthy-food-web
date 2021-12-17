import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthQuery } from './services/auth.query';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authQuery: AuthQuery) {}

  canActivate(): Observable<boolean> | boolean{
    return this.authQuery.isAdmin$;
  }
}
