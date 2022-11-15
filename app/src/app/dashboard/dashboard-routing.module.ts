import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { OverviewComponent } from './views/overview/overview.component';
import { RestockComponent } from './views/restock/restock.component';
import { WithdrawComponent } from './views/withdraw/withdraw.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    {
      path: 'restock',
      component: RestockComponent
    },
    {
      path: 'withdraw',
      component: WithdrawComponent
    },
    {
      path: 'overview',
      component: OverviewComponent
    },
    {
      path: '',
      redirectTo: 'withdraw',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
