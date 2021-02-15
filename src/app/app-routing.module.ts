import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'web',
    loadChildren: () => import('src/app/modules/web/web.module').then(mod => mod.WebModule)
  },
  {
    path: 'account',
    loadChildren: () => import('src/app/modules/account/account.module').then(mod => mod.AccountModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/modules/admin/admin.module').then(mod => mod.AdminModule)
  },
  { path: '**', redirectTo: 'web' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
