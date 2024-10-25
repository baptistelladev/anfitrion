import { NgModule } from '@angular/core';
import { LugaresNaCidadePageRoutingModule } from './lugares-na-cidade-routing.module';
import { LugaresNaCidadePage } from './lugares-na-cidade.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    LugaresNaCidadePageRoutingModule,
    ComponentsModule
  ],
  declarations: [LugaresNaCidadePage]
})
export class LugaresNaCidadePageModule {}
