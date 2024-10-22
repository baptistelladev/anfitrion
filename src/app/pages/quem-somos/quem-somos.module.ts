import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { QuemSomosPageRoutingModule } from './quem-somos-routing.module';

import { QuemSomosPage } from './quem-somos.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    QuemSomosPageRoutingModule
  ],
  declarations: [QuemSomosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuemSomosPageModule {}
