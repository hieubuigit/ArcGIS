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
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { formatDateTimeFromMilliSecond, PopUpType } from '../../share/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaintainTransactionListService } from '../maintain-transaction-list.service';
import { HttpClientModule } from '@angular/common/http';
import { TimeInputDirective } from '../../share/directive/time-input.directive';
import { MaintainTransaction } from '../maintain-transaction-list.model';

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
    TimeInputDirective,
  ],
  providers: [provideNativeDateAdapter(), MaintainTransactionListService],
  templateUrl: './create-or-update-schedule-maintain-popup.component.html',
})
export class CreateOrUpdateScheduleMaintainPopupComponent implements OnInit {
  popupType: PopUpType = PopUpType.Add;
  popupTypes = PopUpType;

  form = this._formBuilder.group({
    code: ['', Validators.required],
    maintenanceName: ['', Validators.required],
    maintenanceDescriptions: ['', [Validators.required]],
    maintenanceCost: this._formBuilder.control<null | number>(null, [
      Validators.required,
    ]),
    startTime: ['', [Validators.required]],
    startDate: this._formBuilder.control<Date>(new Date(), [Validators.required]),
    endTime: ['', [Validators.required]],
    endDate: this._formBuilder.control<Date>(new Date(), [Validators.required]),
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly _service: MaintainTransactionListService,
    private readonly dialogRef: MatDialogRef<CreateOrUpdateScheduleMaintainPopupComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.popupType = this.data.popupType;
      if (this.data.popupType === PopUpType.Add) {
        this.form.controls.code.setValue(this.data.code);
      }
      if (this.data.popupType === PopUpType.Update) {
        this.mapFormData(this.data.rowData);
      }
    }
  }

  onCancel() {}

  onSave() {
    this.dialogRef.close(this.form.getRawValue());
  }

  mapFormData(rowData: MaintainTransaction.Response) {
    const startDate = new Date(rowData.startTime * 1000);
    const endDate = new Date(rowData.endTime * 1000);
    this.form.setValue({
      code: rowData.code,
      maintenanceName: rowData.maintenanceName,
      maintenanceDescriptions: rowData.maintenanceDescriptions,
      maintenanceCost: rowData.maintenanceCost,
      startTime: `${startDate.getHours()}:${startDate.getMinutes()}`,
      startDate: startDate,
      endTime: `${endDate.getHours()}:${endDate.getMinutes()}`,
      endDate: endDate,
    });
  }
}
