import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/services/src/lib/auth-gaurd.service';
import { LoginViewComponent } from './views/login-view/login-view.component';

const routes: Routes = [
  {
    path:'', redirectTo:'Login',pathMatch:'full'
  },
  {
    path:'login', component:LoginViewComponent
  },
  { 
    path: 'dashboard', canLoad:[AuthGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  {
    path:'**',redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
