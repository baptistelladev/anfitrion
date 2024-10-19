import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjudeNossoProjetoPageRoutingModule } from './ajude-nosso-projeto-routing.module';

import { AjudeNossoProjetoPage } from './ajude-nosso-projeto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjudeNossoProjetoPageRoutingModule
  ],
  declarations: [AjudeNossoProjetoPage]
})
export class AjudeNossoProjetoPageModule {}
