import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { WithdrawComponent } from './views/withdraw/withdraw.component';
import { RestockComponent } from './views/restock/restock.component';
import { OverviewComponent } from './views/overview/overview.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    WithdrawComponent,
    RestockComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
