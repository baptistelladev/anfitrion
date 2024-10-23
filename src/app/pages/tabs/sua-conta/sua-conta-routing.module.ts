import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuaContaPage } from './sua-conta.page';

const routes: Routes = [
  {
    path: '',
    component: SuaContaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuaContaPageRoutingModule {}
