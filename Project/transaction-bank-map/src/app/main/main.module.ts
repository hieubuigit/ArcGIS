import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { LoginComponent } from '../user-authentication/login/login.component';
import { ForgotPasswordComponent } from '../user-authentication/forgot-password/forgot-password.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainRoutingModule, LoginComponent, ForgotPasswordComponent],
})
export class MainModule {}
