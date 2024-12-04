import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LugarNaPraiaPageRoutingModule } from './lugar-na-praia-routing.module';
import { LugarNaPraiaPage } from './lugar-na-praia.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    LugarNaPraiaPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [LugarNaPraiaPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LugarNaPraiaPageModule {}
