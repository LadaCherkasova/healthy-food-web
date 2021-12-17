import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({providedIn: 'root'})
export class RecipesService {
  constructor(private http: HttpClient, private authStore: AuthStore) {}

  getAvailableRecipes(): Observable<any> {
    return this.http.get('/recipes/')
      .pipe(
        catchError(this.handleError)
      );
  }

  getCertainRecipe(id: number): Observable<any> {
    return this.http.get('/recipes/' + id + '/')
      .pipe(
        catchError(this.handleError)
      );
  }

  createRecipe(recipe: any): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.post('/recipes/', recipe, {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  getFilteredRecipes(shields: any): Observable<any> {
    let ingredientsStr = '';
    shields.ingredients.forEach(
      ingredient => ingredientsStr = ingredientsStr + ' ' + ingredient.title
    )
    const params = new HttpParams()
      .set('title', shields.title)
      .set('ingredients', ingredientsStr)
      .set('type', shields.type)
      .set('time', shields.time)
      .set('isVegan', shields.isVegan);
    return this.http.get('/recipes/filtered/shields/', {params: params})
      .pipe(
        catchError(this.handleError)
      );
  }

  getOwnRecipes(): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.get('/recipes/own/list/', {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  getAuthorRecipes(recipeId: number): Observable<any> {
    const params = new HttpParams().set('recipeId', recipeId);
    return this.http.get('/recipes/author/list/', {params: params})
      .pipe(
        catchError(this.handleError)
      );
  }

  // updateRecipePreview(preview: any) {
  //   return this.http.post('/recipes/update/preview', {preview: preview})
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(error: HttpErrorResponse, authStore?: any) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again.');
  }
}
