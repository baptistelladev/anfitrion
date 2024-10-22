import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BemVindoABaixadaSantistaPage } from './bem-vindo-a-baixada-santista.page';

const routes: Routes = [
  {
    path: '',
    component: BemVindoABaixadaSantistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BemVindoABaixadaSantistaPageRoutingModule {}
