import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

declare var Userfront: any;

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  canActivate(): Observable<boolean> | boolean{
    return of(Userfront.user.email === 'ladacherkasovav@yandex.ru');
  }
}
