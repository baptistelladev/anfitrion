import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuaContaPageRoutingModule } from './sua-conta-routing.module';

import { SuaContaPage } from './sua-conta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuaContaPageRoutingModule
  ],
  declarations: [SuaContaPage]
})
export class SuaContaPageModule {}
