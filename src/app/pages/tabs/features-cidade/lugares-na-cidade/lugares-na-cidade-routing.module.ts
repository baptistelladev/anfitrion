import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugaresNaCidadePage } from './lugares-na-cidade.page';

const routes: Routes = [
  {
    path: '',
    component: LugaresNaCidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugaresNaCidadePageRoutingModule {}
