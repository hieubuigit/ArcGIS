import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent {
  form = this._formBuilder.group({
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<UpdatePasswordComponent>
  ) {
    this.router.events.subscribe((event) => {
      console.log(event); // Log router events for debugging
    });
  }

  onChangePassword() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
