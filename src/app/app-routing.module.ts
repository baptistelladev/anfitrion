import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/core/guards/auth.guard';

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
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard]
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
    path: 'quem-somos',
    loadChildren: () => import('./pages/quem-somos/quem-somos.module').then( m => m.QuemSomosPageModule)
  },
  {
    path: 'sem-internet',
    loadChildren: () => import('./pages/sem-internet/sem-internet.module').then( m => m.SemInternetPageModule)
  },
  {
    path: 'verificar-alteracao-de-email',
    loadChildren: () => import('./pages/verificacao/verificar-alteracao-de-email/verificar-alteracao-de-email.module').then( m => m.VerificarAlteracaoDeEmailPageModule)
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
