import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrocarIdiomaPageRoutingModule } from './trocar-idioma-routing.module';

import { TrocarIdiomaPage } from './trocar-idioma.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    TrocarIdiomaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TrocarIdiomaPage]
})
export class TrocarIdiomaPageModule {}
