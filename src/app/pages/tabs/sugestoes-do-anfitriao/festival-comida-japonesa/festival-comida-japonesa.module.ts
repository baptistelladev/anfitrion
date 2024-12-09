import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FestivalComidaJaponesaPageRoutingModule } from './festival-comida-japonesa-routing.module';

import { FestivalComidaJaponesaPage } from './festival-comida-japonesa.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    FestivalComidaJaponesaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FestivalComidaJaponesaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FestivalComidaJaponesaPageModule {}
