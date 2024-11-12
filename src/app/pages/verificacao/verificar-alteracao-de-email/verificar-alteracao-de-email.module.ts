import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarAlteracaoDeEmailPageRoutingModule } from './verificar-alteracao-de-email-routing.module';

import { VerificarAlteracaoDeEmailPage } from './verificar-alteracao-de-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarAlteracaoDeEmailPageRoutingModule
  ],
  declarations: [VerificarAlteracaoDeEmailPage]
})
export class VerificarAlteracaoDeEmailPageModule {}
