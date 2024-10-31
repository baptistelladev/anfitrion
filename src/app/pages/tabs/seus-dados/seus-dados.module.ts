import { NgModule } from '@angular/core';
import { SeusDadosPageRoutingModule } from './seus-dados-routing.module';

import { SeusDadosPage } from './seus-dados.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    SeusDadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SeusDadosPage]
})
export class SeusDadosPageModule {}
