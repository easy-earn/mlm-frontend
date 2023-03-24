import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PlanComponent } from './plan/plan.component';
import { UserDetailResolver } from './plan/plan.resovler';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "setting",
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
      },
      {
        path: "plans",
        component: PlanComponent,
        resolve: {
          userResponse: UserDetailResolver
        },
      },
      {
        path: "**",
        redirectTo: "home"
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
