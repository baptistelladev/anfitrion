import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LinksPageRoutingModule } from './links-routing.module';
import { LinksPage } from './links.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  imports: [
    SharedModule,
    LinksPageRoutingModule,
    ComponentsModule,
    LottieComponent
  ],
  declarations: [LinksPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinksPageModule {}
