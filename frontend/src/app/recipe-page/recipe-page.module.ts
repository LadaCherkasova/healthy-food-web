import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePageComponent } from './recipe-page.component';
import { PortionsPhrasePipe } from '../pipes/portions-phrase.pipe';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [RecipePageComponent],
  imports: [CommonModule, PipesModule],
  exports: [RecipePageComponent],
  providers: [PortionsPhrasePipe],
})
export class RecipePageModule {}
