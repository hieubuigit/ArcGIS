import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { PopUpType } from '../../share/common';
import {
  Gender,
  GenderItems,
  User,
  UserType,
  UserTypeItems,
} from '../user-management.model';

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
})
export class CreateOrUpdateUserPopupComponent implements OnInit {
  form = this._formBuilder.group({
    userId: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(12)]],
    email: ['', [Validators.required]],
    gender: this._formBuilder.control<Gender>(Gender.Male, [
      Validators.required,
    ]),
    address: ['', [Validators.required]],
    userType: [UserType.Admin, [Validators.required]],
  });
  popupType: PopUpType = PopUpType.Add;
  popupTypes = PopUpType;
  userTypeItems = UserTypeItems;
  genderItems = GenderItems;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateOrUpdateUserPopupComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.popupType = this.data.popupType;
      if (this.data.popupType === PopUpType.Update) {
        this.mapFormData(this.data.rowData);
      }
    }
  }

  onSave() {
    this.dialogRef.close(this.form.getRawValue());
  }

  mapFormData(rowData: User) {
    this.form.setValue({
      userId: rowData.userId,
      email: rowData.email,
      userName: rowData.userName,
      password: rowData.password,
      fullName: rowData.fullName,
      phone: rowData.phone,
      gender: rowData.gender,
      address: rowData.address,
      userType: rowData.userType,
    });
  }
}
