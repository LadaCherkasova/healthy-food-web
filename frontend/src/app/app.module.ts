import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderModule } from './header/header.module';
import { FindPageModule } from './find-page/find-page.module';
import { RecipePreviewModule } from './recipe-preview/recipe-preview.module';
import { FavoritePageModule } from './favorite-page/favorite-page.module';
import { RecipePageModule } from './recipe-page/recipe-page.module';
import { RegisterDialogModule } from './register-dialog/register-dialog.module';
import { LoginDialogModule } from './login-dialog/login-dialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './services/settings.service';
import { RecipesService } from './services/recipes.service';
import { AddRecipePageModule } from './add-recipe-page/add-recipe-page.module';
import { FavoritesService } from './services/favorites.service';
import { AuthorizationGuard } from './authorization.guard';
import { ModerationPageModule } from './moderation-page/moderation-page.module';
import { ModerationService } from './services/moderation.service';
import { IngredientDialogModule } from './ingredient-dialog/ingredient-dialog.module';
import { AdminGuard } from './admin.guard';
import { AuthorPageModule } from './author-page/author-page.module';
import { PipesModule } from './pipes/pipes.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HeaderModule,
    FindPageModule,
    RecipePreviewModule,
    FavoritePageModule,
    RecipePageModule,
    LoginDialogModule,
    RegisterDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AddRecipePageModule,
    ModerationPageModule,
    IngredientDialogModule,
    AuthorPageModule,
    PipesModule,
  ],
  providers: [
    AuthService,
    SettingsService,
    RecipesService,
    FavoritesService,
    ModerationService,
    AuthorizationGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
