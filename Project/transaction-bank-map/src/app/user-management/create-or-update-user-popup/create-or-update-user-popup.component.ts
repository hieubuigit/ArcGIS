import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
import { PopUpType } from '../../share/common';
import { Gender, UserType } from '../user-management.model';

@Component({
  selector: 'app-create-or-update-user-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatRadioModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle,
  ],
  templateUrl: './create-or-update-user-popup.component.html',
  styleUrl: './create-or-update-user-popup.component.scss'
})
export class CreateOrUpdateUserPopupComponent {
  form = this._formBuilder.group({
    userId: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    gender: [Gender.Male, [Validators.required]],
    address: ['', [Validators.required]],
    role: [UserType.Admin, [Validators.required]],
  });
  popupType: PopUpType = PopUpType.Add;

  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  onCancel() {}

  onSave() {}
}
