import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstabelecimentoPageRoutingModule } from './estabelecimento-routing.module';

import { EstabelecimentoPage } from './estabelecimento.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    EstabelecimentoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstabelecimentoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EstabelecimentoPageModule {}
