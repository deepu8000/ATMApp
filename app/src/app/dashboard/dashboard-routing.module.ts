import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/services/src/lib/auth-gaurd.service';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { OverviewComponent } from './views/overview/overview.component';
import { RestockComponent } from './views/restock/restock.component';
import { WithdrawComponent } from './views/withdraw/withdraw.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  canActivate:[AuthGuard],
  canActivateChild:[AuthGuard],
  children: [
    {
      path: 'restock',
      component: RestockComponent,
      data: {
        roles: ['admin']
      }
    },
    {
      path: 'withdraw',
      component: WithdrawComponent,
      data: {
        roles: ['admin','user']
      }
    },
    {
      path: 'overview',
      component: OverviewComponent,
      data: {
        roles: ['admin','user']
      }
    },
    {
      path: '',
      redirectTo: 'overview',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
