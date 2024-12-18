import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EstabelecimentoPraiaPageRoutingModule } from './estabelecimento-praia-routing.module';
import { EstabelecimentoPraiaPage } from './estabelecimento-praia.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    EstabelecimentoPraiaPageRoutingModule
  ],
  declarations: [EstabelecimentoPraiaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EstabelecimentoPraiaPageModule {}
