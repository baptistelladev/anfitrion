import { NgModule } from '@angular/core';
import { ExplorarPageRoutingModule } from './explorar-routing.module';

import { ExplorarPage } from './explorar.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ExplorarPageRoutingModule
  ],
  declarations: [ExplorarPage]
})
export class ExplorarPageModule {}
