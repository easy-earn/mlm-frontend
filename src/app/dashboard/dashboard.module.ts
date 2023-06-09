import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PlanComponent } from './plan/plan.component';
import { PlanPurchaseModalComponent } from './plan-purchase-modal/plan-purchase-modal.component';
import { MyUsersComponent } from './my-users/my-users.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    PlanComponent,
    PlanPurchaseModalComponent,
    MyUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ],
  providers: []
})
export class DashboardModule { }
