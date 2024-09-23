import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = this._formBuilder.group({
    userName: ['', Validators.required],
    password: ['', [Validators.required]],
  });

  constructor(private _formBuilder: FormBuilder, private router: Router) {

  }

  onLogin() {
    const formData = this.form.getRawValue();
    if ((formData.userName === '123', formData.password === '123')) {
      this.router.navigate(['/guest-map']);
    }
  }
}
