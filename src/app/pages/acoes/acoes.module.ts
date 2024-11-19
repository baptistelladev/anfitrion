import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcoesPageRoutingModule } from './acoes-routing.module';

import { AcoesPage } from './acoes.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    AcoesPageRoutingModule
  ],
  declarations: [AcoesPage]
})
export class AcoesPageModule {}
