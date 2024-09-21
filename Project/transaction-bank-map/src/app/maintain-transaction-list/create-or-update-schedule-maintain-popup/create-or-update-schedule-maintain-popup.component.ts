import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
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
import { PopUpType } from '../../share/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaintainTransactionListService } from '../maintain-transaction-list.service';
import { HttpClientModule } from '@angular/common/http';

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
    MatDialogTitle,
    MatDialogModule,
    MatDatepickerModule,
    HttpClientModule,
  ],
  providers: [provideNativeDateAdapter(), MaintainTransactionListService],
  templateUrl: './create-or-update-schedule-maintain-popup.component.html',
})
export class CreateOrUpdateScheduleMaintainPopupComponent implements OnInit {
  popupType: PopUpType = PopUpType.Add;
  popupTypes = PopUpType;

  form = this._formBuilder.group({
    transOfficeCode: ['', Validators.required],
    calendarName: ['', Validators.required],
    description: ['', [Validators.required]],
    cost: this._formBuilder.control<null | number>(null, [Validators.required]),
    startTime: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _service: MaintainTransactionListService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.popupType = this.data.popupType;
    }
  }

  onCancel() {}

  onSave() {
    console.log(this.form.getRawValue());
    if (this.popupType === PopUpType.Add) {
      this._service.add().subscribe({
        next: (resp) => {},
        error: (err) => {},
      });
    } else if (this.popupType === PopUpType.Update) {
      this._service.update(0).subscribe({
        next: (resp) => {},
        error: (err) => {},
      });
    }
  }
}
