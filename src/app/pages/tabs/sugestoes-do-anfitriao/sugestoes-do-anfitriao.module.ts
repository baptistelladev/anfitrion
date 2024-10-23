import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugestoesDoAnfitriaoPageRoutingModule } from './sugestoes-do-anfitriao-routing.module';

import { SugestoesDoAnfitriaoPage } from './sugestoes-do-anfitriao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugestoesDoAnfitriaoPageRoutingModule
  ],
  declarations: [SugestoesDoAnfitriaoPage]
})
export class SugestoesDoAnfitriaoPageModule {}
