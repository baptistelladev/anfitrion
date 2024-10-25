import { NgModule } from '@angular/core';
import { CidadesPageRoutingModule } from './cidades-routing.module';
import { CidadesPage } from './cidades.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    CidadesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CidadesPage]
})
export class CidadesPageModule {}
