import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserAuthenticationService } from '../user-authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../share/local-storage/local-storage.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { PopUpType } from '../../share/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    HttpClientModule,
  ],
  providers: [UserAuthenticationService, LocalStorageService],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = this._formBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
  error = signal<string | null>(null);

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly _userAuth: UserAuthenticationService,
    private readonly _lsStorageSvc: LocalStorageService,
    private readonly _dialog: MatDialog
  ) {}

  onLogin() {
    const { username, password } = this.form.getRawValue();
    const request = { username: username, password: password };
    this._userAuth.login(request).subscribe({
      next: (value) => {
        if (!value) return;
        this._lsStorageSvc.setCurrentUser(value.data);
        this.router.navigate(['/map']);
      },
      error: (err) => {
        this.error.set('Tài khoản và mật khẩu không chính xác!');
      },
    });
  }

  onForgotPassword() {
    const dialogRef = this._dialog.open(ForgotPasswordComponent, {
      width: '700px',
      data: { popupType: PopUpType.Add },
    });
  }
}
