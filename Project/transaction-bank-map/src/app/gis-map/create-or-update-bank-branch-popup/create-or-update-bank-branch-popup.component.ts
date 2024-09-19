import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { GisMap } from '../gis-map.model';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-or-update-bank-branch-popup',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatRadioModule,
    MatRadioGroup,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle,
  ],
  templateUrl: './create-or-update-bank-branch-popup.component.html',
  styleUrl: './create-or-update-bank-branch-popup.component.scss',
})
export class CreateOrUpdateBankBranchPopupComponent {
  @Input() popupType!: GisMap.PopUpType;

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

  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  onCancel() {}

  onSave() {}
}
