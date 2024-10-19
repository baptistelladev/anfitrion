import { NgModule } from '@angular/core';
import { PaginaNaoExistePageRoutingModule } from './pagina-nao-existe-routing.module';

import { PaginaNaoExistePage } from './pagina-nao-existe.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PaginaNaoExistePageRoutingModule
  ],
  declarations: [PaginaNaoExistePage]
})
export class PaginaNaoExistePageModule {}
