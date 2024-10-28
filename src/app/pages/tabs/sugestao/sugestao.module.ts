import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugestaoPageRoutingModule } from './sugestao-routing.module';

import { SugestaoPage } from './sugestao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugestaoPageRoutingModule
  ],
  declarations: [SugestaoPage]
})
export class SugestaoPageModule {}
