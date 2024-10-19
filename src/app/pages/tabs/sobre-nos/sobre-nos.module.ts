import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobreNosPageRoutingModule } from './sobre-nos-routing.module';

import { SobreNosPage } from './sobre-nos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SobreNosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SobreNosPage]
})
export class SobreNosPageModule {}
