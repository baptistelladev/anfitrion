import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermosECondicoesDeUsoPageRoutingModule } from './termos-e-condicoes-de-uso-routing.module';

import { TermosECondicoesDeUsoPage } from './termos-e-condicoes-de-uso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermosECondicoesDeUsoPageRoutingModule
  ],
  declarations: [TermosECondicoesDeUsoPage]
})
export class TermosECondicoesDeUsoPageModule {}
