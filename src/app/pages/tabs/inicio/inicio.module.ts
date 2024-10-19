import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    InicioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InicioPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class InicioPageModule {}
