import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user-authentication/login/login.component';
import { ForgotPasswordComponent } from '../user-authentication/forgot-password/forgot-password.component';
import { GisMapComponent } from '../gis-map/gis-map.component';
import { MaintainTransactionListComponent } from '../maintain-transaction-list/maintain-transaction-list.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { TransactionManagementComponent } from '../transaction-management/transaction-management.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'guest-map',
    component: GisMapComponent,
  },
  {
    path: 'maintain-transaction-list',
    component: MaintainTransactionListComponent,
  },
 {
    path: 'user-management',
    component: UserManagementComponent,
  },
 {
    path: 'transaction-management',
    component: TransactionManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
