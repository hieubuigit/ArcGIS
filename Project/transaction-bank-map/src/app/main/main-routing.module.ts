import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user-authentication/login/login.component';
import { ForgotPasswordComponent } from '../user-authentication/forgot-password/forgot-password.component';
import { GisMapComponent } from '../gis-map/gis-map.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';

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
    path: 'transaction-list',
    component: TransactionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
