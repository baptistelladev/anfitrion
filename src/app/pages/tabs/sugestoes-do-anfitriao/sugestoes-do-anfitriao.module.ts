import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SugestoesDoAnfitriaoPageRoutingModule } from './sugestoes-do-anfitriao-routing.module';

import { SugestoesDoAnfitriaoPage } from './sugestoes-do-anfitriao.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  imports: [
    SharedModule,
    SugestoesDoAnfitriaoPageRoutingModule,
    ComponentsModule,
    LottieComponent
  ],
  declarations: [SugestoesDoAnfitriaoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SugestoesDoAnfitriaoPageModule {}
