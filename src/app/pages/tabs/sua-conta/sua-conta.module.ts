import { NgModule } from '@angular/core';
import { SuaContaPageRoutingModule } from './sua-conta-routing.module';

import { SuaContaPage } from './sua-conta.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    SuaContaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SuaContaPage]
})
export class SuaContaPageModule {}
