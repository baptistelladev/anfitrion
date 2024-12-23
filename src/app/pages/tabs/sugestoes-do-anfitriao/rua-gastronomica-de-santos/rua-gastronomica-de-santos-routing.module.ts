import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuaGastronomicaDeSantosPage } from './rua-gastronomica-de-santos.page';

const routes: Routes = [
  {
    path: '',
    component: RuaGastronomicaDeSantosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RuaGastronomicaDeSantosPageRoutingModule {}
