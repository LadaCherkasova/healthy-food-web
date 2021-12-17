import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({providedIn: 'root'})
export class SettingsService {
  constructor(private http: HttpClient, private authStore: AuthStore) {}

  getAvailableIngredients(): Observable<any> {
    return this.http.get('/settings/ingredients')
      .pipe(
        catchError(this.handleError)
      );
  }

  getDishesTypes(): Observable<any> {
    return this.http.get('/settings/types')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again.');
  }
}
