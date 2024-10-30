import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugestaoPageRoutingModule } from './sugestao-routing.module';

import { SugestaoPage } from './sugestao.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    SugestaoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SugestaoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SugestaoPageModule {}
