import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { SettingRoutingModule } from './setting.routing';
import { AccountCreateEditModalComponent } from './account-create-edit-modal/account-create-edit-modal.component';



@NgModule({
  declarations: [
    SettingComponent,
    AccountCreateEditModalComponent
  ],
  imports: [
    SettingRoutingModule,
    CommonModule,
    SharedModule,
    MatCardModule
  ]
})
export class SettingModule { }
