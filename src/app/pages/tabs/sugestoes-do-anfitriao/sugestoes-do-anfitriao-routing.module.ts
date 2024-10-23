import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugestoesDoAnfitriaoPage } from './sugestoes-do-anfitriao.page';

const routes: Routes = [
  {
    path: '',
    component: SugestoesDoAnfitriaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugestoesDoAnfitriaoPageRoutingModule {}
