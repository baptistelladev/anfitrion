import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LugarNaCidadePageRoutingModule } from './lugar-na-cidade-routing.module';

import { LugarNaCidadePage } from './lugar-na-cidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LugarNaCidadePageRoutingModule
  ],
  declarations: [LugarNaCidadePage]
})
export class LugarNaCidadePageModule {}
