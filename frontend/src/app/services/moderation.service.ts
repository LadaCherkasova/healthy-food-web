import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable({providedIn: 'root'})
export class ModerationService {
  constructor(private http: HttpClient, private authStore: AuthStore) {}

  getModeratedRecipes(): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.get('/moderation/recipes', {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  getModeratedIngredients(): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.get('/moderation/ingredients', {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  approveModeratedRecipe(id: number): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.post('/moderation/approve', {isRecipe: true, recipeId: id}, {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  approveModeratedIngredient(id: number): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.post('/moderation/approve', {isRecipe: false, ingredientId: id}, {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  sendIngredientForModeration(name: string): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.post('/moderation/ingredient', {ingredient: name},{headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  declineModeratedIngredient(id: number): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    const params = new HttpParams()
      .set('isRecipe', false)
      .set('ingredientId', id);
    return this.http.delete('/moderation/decline', {headers: header, params: params})
      .pipe(
        catchError(this.handleError)
      );
  }

  declineModeratedRecipe(id: number): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    const params = new HttpParams()
      .set('isRecipe', true)
      .set('recipeId', id);
    return this.http.delete('/moderation/decline', {headers: header, params: params})
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
