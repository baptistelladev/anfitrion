import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobreACidadePageRoutingModule } from './sobre-a-cidade-routing.module';

import { SobreACidadePage } from './sobre-a-cidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobreACidadePageRoutingModule
  ],
  declarations: [SobreACidadePage]
})
export class SobreACidadePageModule {}
