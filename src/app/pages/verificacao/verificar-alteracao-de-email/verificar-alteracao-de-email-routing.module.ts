import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarAlteracaoDeEmailPage } from './verificar-alteracao-de-email.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarAlteracaoDeEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarAlteracaoDeEmailPageRoutingModule {}
