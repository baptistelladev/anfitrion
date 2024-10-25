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
        redirectTo: 'explorar',
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
      },
      {
        path: 'explorar',
        children: [
          {
            path: '',
            redirectTo: 'explorar',
            pathMatch: 'full'
          },
          {
            path: '',
            loadChildren: () => import('./explorar/explorar.module').then( m => m.ExplorarPageModule),
          },
          {
            path: 'lugares-na-cidade',
            loadChildren: () => import('./features-cidade/lugares-na-cidade/lugares-na-cidade.module').then( m => m.LugaresNaCidadePageModule)
          }
        ]
      },
      {
        path: 'bem-vindo-a-baixada-santista',
        loadChildren: () => import('./bem-vindo-a-baixada-santista/bem-vindo-a-baixada-santista.module').then( m => m.BemVindoABaixadaSantistaPageModule)
      },
      {
        path: 'sua-conta',
        loadChildren: () => import('./sua-conta/sua-conta.module').then( m => m.SuaContaPageModule)
      },
      {
        path: 'seus-dados',
        loadChildren: () => import('./seus-dados/seus-dados.module').then( m => m.SeusDadosPageModule)
      },
      {
        path: 'sugestoes-do-anfitriao',
        loadChildren: () => import('./sugestoes-do-anfitriao/sugestoes-do-anfitriao.module').then( m => m.SugestoesDoAnfitriaoPageModule)
      },
      {
        path: 'cidades',
        loadChildren: () => import('./cidades/cidades.module').then( m => m.CidadesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
