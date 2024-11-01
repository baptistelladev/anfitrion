import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemInternetPageRoutingModule } from './sem-internet-routing.module';

import { SemInternetPage } from './sem-internet.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    SemInternetPageRoutingModule
  ],
  declarations: [SemInternetPage]
})
export class SemInternetPageModule {}
