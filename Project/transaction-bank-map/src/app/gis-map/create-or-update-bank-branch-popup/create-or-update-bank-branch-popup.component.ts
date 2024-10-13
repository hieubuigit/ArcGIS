import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { GisMap } from '../gis-map.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { PopUpType } from '../../share/common';
import { TransactionOfficeService } from '../../transaction-office/transaction-office.service';
import { HttpClientModule } from '@angular/common/http';
import { TransactionOffice } from '../../transaction-office/transaction-office.model';

@Component({
  selector: 'app-create-or-update-bank-branch-popup',
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
    HttpClientModule,
  ],
  providers: [TransactionOfficeService],
  templateUrl: './create-or-update-bank-branch-popup.component.html',
})
export class CreateOrUpdateBankBranchPopupComponent implements OnInit {
  form = this._formBuilder.group({
    code: ['', Validators.required],
    officeName: ['', Validators.required],
    officeAddress: ['', [Validators.required]],
    officeDescriptions: ['', [Validators.required]],
    wardId: this._formBuilder.control<null | string>(null, [
      Validators.required,
    ]),
    officeStatus: this._formBuilder.control<null | number>(TransactionOffice.Status.Active, [
      Validators.required,
    ]),
    officeUptime: ['', [Validators.required]],
    officeCost: this._formBuilder.control<null | number>(null, [
      Validators.required,
    ]),
    latitude: this._formBuilder.control<null | number>(null, [
      Validators.required,
    ]),
    longitude: this._formBuilder.control<null | number>(null, [
      Validators.required,
    ]),
  });
  popupType: PopUpType = PopUpType.Add;
  popupTypes = PopUpType;
  status = GisMap.StatusList;
  wards = signal<TransactionOffice.Ward[]>([]);

  constructor(
    private readonly _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<CreateOrUpdateBankBranchPopupComponent>,
    private readonly _transOffSvc: TransactionOfficeService
  ) {}

  ngOnInit(): void {
    this.fetchWardData();
    if (this.data) {
      this.popupType = this.data.popupType;
      if (this.data.popupType === PopUpType.Add) {
        this.getCode();
      }
      if (this.data.popupType === PopUpType.Update && this.data.rowData) {
        this.mapFormData(this.data.rowData);
      }
    }
  }

  fetchWardData() {
    this._transOffSvc.getWard().subscribe({
      next: (result) => {
        this.wards.set(result.data.ward);
      },
      error: (err) => {},
    });
  }

  getCode() {
    this._transOffSvc.getCode().subscribe({
      next: (result) => {
        this.form.controls.code.setValue(result.data);
      },
    });
  }

  onSave() {
    console.log(this.form.getRawValue());
    this.dialogRef.close(this.form.getRawValue());
  }

  mapFormData(rowData: TransactionOffice.CreateOrUpdate) {
    this.form.setValue({
      code: rowData.code,
      officeName: rowData.officeName,
      officeAddress: rowData.officeAddress,
      officeDescriptions: rowData.officeDescriptions,
      wardId: rowData.wardId ?? '',
      officeStatus: Number(rowData.officeStatus),
      officeUptime: rowData.officeUptime,
      officeCost: rowData.officeCost,
      latitude: rowData.latitude,
      longitude: rowData.longitude,
    });
  }
}
