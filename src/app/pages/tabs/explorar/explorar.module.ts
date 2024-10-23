import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ExplorarPageRoutingModule } from './explorar-routing.module';

import { ExplorarPage } from './explorar.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from "../../../shared/components/components.module";

@NgModule({
  imports: [
    SharedModule,
    ExplorarPageRoutingModule,
    ComponentsModule
],
  declarations: [ExplorarPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ExplorarPageModule {}
