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
        path: 'apoie-nosso-projeto',
        loadChildren: () => import('./ajude-nosso-projeto/ajude-nosso-projeto.module').then( m => m.AjudeNossoProjetoPageModule)
      },
      {
        path: 'estabelecimento-na-cidade/:name',
        loadChildren: () => import('./estabelecimento/estabelecimento.module').then( m => m.EstabelecimentoPageModule)
      },
      {
        path: 'estabelecimento-na-praia/:name',
        loadChildren: () => import('./estabelecimento-praia/estabelecimento-praia.module').then( m => m.EstabelecimentoPraiaPageModule)
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
        path: 'explorar',
        children: [
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full'
          },
          {
            path: '',
            loadChildren: () => import('./explorar/explorar.module').then( m => m.ExplorarPageModule),
          },
          {
            path: 'lugares-na-cidade/:place_type',
            loadChildren: () => import('./features-cidade/lugar-na-cidade/lugar-na-cidade.module').then( m => m.LugarNaCidadePageModule)
          },
          {
            path: 'lugares-na-praia/:place_type',
            loadChildren: () => import('./features-praia/lugar-na-praia/lugar-na-praia.module').then( m => m.LugarNaPraiaPageModule)
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
        children: [
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full'
          },
          {
            path: '',
            loadChildren: () => import('./sugestoes-do-anfitriao/sugestoes-do-anfitriao.module').then( m => m.SugestoesDoAnfitriaoPageModule)
          },
          {
            path: 'festival-comida-japonesa',
            loadChildren: () => import('./sugestoes-do-anfitriao/festival-comida-japonesa/festival-comida-japonesa.module').then( m => m.FestivalComidaJaponesaPageModule)
          },
          {
            path: ':suggestion',
            loadChildren: () => import('./sugestao/sugestao.module').then( m => m.SugestaoPageModule)
          }
        ]
      },
      {
        path: 'cidades',
        loadChildren: () => import('./cidades/cidades.module').then( m => m.CidadesPageModule)
      },
      {
        path: 'termos-e-condicoes-de-uso',
        loadChildren: () => import('./termos-e-condicoes-de-uso/termos-e-condicoes-de-uso.module').then( m => m.TermosECondicoesDeUsoPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
