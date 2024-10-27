import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugarNaCidadePage } from './lugar-na-cidade.page';

const routes: Routes = [
  {
    path: '',
    component: LugarNaCidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugarNaCidadePageRoutingModule {}
