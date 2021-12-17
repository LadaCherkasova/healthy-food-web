import { NgModule } from '@angular/core';

import { PortionsPhrasePipe } from './portions-phrase.pipe';
import { SafeUrlPipe } from './safe-url.pipe';


@NgModule({
  declarations: [PortionsPhrasePipe, SafeUrlPipe],
  imports: [],
  exports: [PortionsPhrasePipe, SafeUrlPipe],
})
export class PipesModule {}
