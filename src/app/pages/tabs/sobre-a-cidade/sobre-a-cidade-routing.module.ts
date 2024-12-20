import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SobreACidadePage } from './sobre-a-cidade.page';

const routes: Routes = [
  {
    path: '',
    component: SobreACidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobreACidadePageRoutingModule {}
