import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemInternetPage } from './sem-internet.page';

const routes: Routes = [
  {
    path: '',
    component: SemInternetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemInternetPageRoutingModule {}
