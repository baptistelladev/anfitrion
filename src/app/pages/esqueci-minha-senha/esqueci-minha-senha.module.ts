import { NgModule } from '@angular/core';
import { EsqueciMinhaSenhaPageRoutingModule } from './esqueci-minha-senha-routing.module';
import { EsqueciMinhaSenhaPage } from './esqueci-minha-senha.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    EsqueciMinhaSenhaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EsqueciMinhaSenhaPage]
})
export class EsqueciMinhaSenhaPageModule {}
