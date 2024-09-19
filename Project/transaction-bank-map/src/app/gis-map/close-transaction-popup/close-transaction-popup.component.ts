import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-close-transaction-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './close-transaction-popup.component.html',
  styleUrl: './close-transaction-popup.component.scss',
})
export class CloseTransactionPopupComponent {
  constructor() {}

  onCancel() {}

  onAccept() {}
}
