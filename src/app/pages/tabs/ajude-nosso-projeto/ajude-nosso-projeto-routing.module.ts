import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjudeNossoProjetoPage } from './ajude-nosso-projeto.page';

const routes: Routes = [
  {
    path: '',
    component: AjudeNossoProjetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjudeNossoProjetoPageRoutingModule {}
