import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './share/ui/page-not-found/page-not-found.component';
import { LoginComponent } from './user-authentication/login/login.component';
import { ForgotPasswordComponent } from './user-authentication/forgot-password/forgot-password.component';
import { MaintainTransactionListComponent } from './maintain-transaction-list/maintain-transaction-list.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';
import { GisMapComponent } from './gis-map/gis-map.component';
import { userAuthenticationGuard } from './share/authentication/user-authentication.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest-map',
    pathMatch: 'full',
  },
  {
    path: 'guest-map',
    component: GisMapComponent,
  },
  {
    path: 'admin',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'maintain-transaction-list',
    canActivate: [userAuthenticationGuard],
    component: MaintainTransactionListComponent,
  },
  {
    path: 'user-management',
    canActivate: [userAuthenticationGuard],
    component: UserManagementComponent,
  },
  {
    path: 'transaction-management',
    canActivate: [userAuthenticationGuard],
    component: TransactionManagementComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
