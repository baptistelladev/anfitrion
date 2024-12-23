import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RuaGastronomicaDeSantosPageRoutingModule } from './rua-gastronomica-de-santos-routing.module';
import { RuaGastronomicaDeSantosPage } from './rua-gastronomica-de-santos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    RuaGastronomicaDeSantosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RuaGastronomicaDeSantosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RuaGastronomicaDeSantosPageModule {}
