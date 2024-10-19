import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'apoie-nosso-projeto',
        loadChildren: () => import('./ajude-nosso-projeto/ajude-nosso-projeto.module').then( m => m.AjudeNossoProjetoPageModule)
      },
      {
        path: 'estabelecimento/:name',
        loadChildren: () => import('./estabelecimento/estabelecimento.module').then( m => m.EstabelecimentoPageModule)
      },
      {
        path: 'trocar-idioma',
        loadChildren: () => import('./trocar-idioma/trocar-idioma.module').then( m => m.TrocarIdiomaPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'contato',
        loadChildren: () => import('./contato/contato.module').then( m => m.ContatoPageModule)
      },
      {
        path: 'sobre-nos',
        loadChildren: () => import('./sobre-nos/sobre-nos.module').then( m => m.SobreNosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
