import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeusDadosPageRoutingModule } from './seus-dados-routing.module';

import { SeusDadosPage } from './seus-dados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeusDadosPageRoutingModule
  ],
  declarations: [SeusDadosPage]
})
export class SeusDadosPageModule {}
