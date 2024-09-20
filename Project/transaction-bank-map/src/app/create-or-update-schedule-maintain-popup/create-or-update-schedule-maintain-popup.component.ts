import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { PopUpType } from '../share/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-or-update-schedule-maintain-popup',
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
    MatDatepickerModule,
  ],
  templateUrl: './create-or-update-schedule-maintain-popup.component.html',
  styleUrl: './create-or-update-schedule-maintain-popup.component.scss',
})
export class CreateOrUpdateScheduleMaintainPopupComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  popupType: PopUpType = PopUpType.Add;

  form = this._formBuilder.group({
    transOfficeCode: ['', Validators.required],
    calendarName: ['', Validators.required],
    description: ['', [Validators.required]],
    cost: [0, [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  });

  constructor(private _formBuilder: FormBuilder, private router: Router) {}
  onCancel() {}

  onSave() {}
}
