import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BemVindoABaixadaSantistaPageRoutingModule } from './bem-vindo-a-baixada-santista-routing.module';

import { BemVindoABaixadaSantistaPage } from './bem-vindo-a-baixada-santista.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BemVindoABaixadaSantistaPageRoutingModule
  ],
  declarations: [BemVindoABaixadaSantistaPage]
})
export class BemVindoABaixadaSantistaPageModule {}
