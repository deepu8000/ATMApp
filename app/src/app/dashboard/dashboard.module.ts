import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { WithdrawComponent } from './views/withdraw/withdraw.component';
import { RestockComponent } from './views/restock/restock.component';
import { OverviewComponent } from './views/overview/overview.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WithdrawComponent,
    RestockComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
