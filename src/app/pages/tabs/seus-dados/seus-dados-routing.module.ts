import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeusDadosPage } from './seus-dados.page';

const routes: Routes = [
  {
    path: '',
    component: SeusDadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeusDadosPageRoutingModule {}
