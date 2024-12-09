import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FestivalComidaJaponesaPage } from './festival-comida-japonesa.page';

const routes: Routes = [
  {
    path: '',
    component: FestivalComidaJaponesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FestivalComidaJaponesaPageRoutingModule {}
