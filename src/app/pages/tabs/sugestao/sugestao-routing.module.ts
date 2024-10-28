import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugestaoPage } from './sugestao.page';

const routes: Routes = [
  {
    path: '',
    component: SugestaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugestaoPageRoutingModule {}
