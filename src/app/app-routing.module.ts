import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'logado',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'trocar-idioma',
    loadChildren: () => import('./pages/trocar-idioma/trocar-idioma.module').then( m => m.TrocarIdiomaPageModule)
  },
  {
    path: 'esqueci-minha-senha',
    loadChildren: () => import('./pages/esqueci-minha-senha/esqueci-minha-senha.module').then( m => m.EsqueciMinhaSenhaPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/pagina-nao-existe/pagina-nao-existe.module').then( m => m.PaginaNaoExistePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
