import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugarNaPraiaPage } from './lugar-na-praia.page';

const routes: Routes = [
  {
    path: '',
    component: LugarNaPraiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugarNaPraiaPageRoutingModule {}
