import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgModule } from '@angular/core';

import { SobreNosPageRoutingModule } from './sobre-nos-routing.module';

import { SobreNosPage } from './sobre-nos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SobreNosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SobreNosPage]
})
export class SobreNosPageModule {}
