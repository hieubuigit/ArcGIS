import { Component, Inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { GisMap } from '../gis-map.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { PopUpType, SelectItem } from '../../share/common';
import { UserType } from '../../user-management/user-management.model';

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
  ],
  templateUrl: './create-or-update-bank-branch-popup.component.html',
})
export class CreateOrUpdateBankBranchPopupComponent implements OnInit {
  form = this._formBuilder.group({
    transOfficeCode: ['', Validators.required],
    transOfficeName: ['', Validators.required],
    transAddress: ['', [Validators.required]],
    description: ['', [Validators.required]],
    ward: ['', [Validators.required]],
    status: [0, [Validators.required]],
    uptime: ['', [Validators.required]],
    investmentCost: ['', [Validators.required]],
    lat: ['', [Validators.required]],
    long: ['', [Validators.required]],
  });
  popupType: PopUpType = PopUpType.Add;
  popupTypes = PopUpType;
  status = GisMap.StatusList;

  wards = signal<SelectItem<number>[]>([]);

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.popupType = this.data.popupType;
    }
  }

  onCancel() {}

  onSave() {}

  getWards() {}
}
