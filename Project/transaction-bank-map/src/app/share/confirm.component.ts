import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  template: `
    <div mat-dialog-title>{{ title }}</div>
    <div mat-dialog-content>
      {{ content }}
    </div>
    <div mat-dialog-actions>
      <button mat-stroked-button mat-dialog-close (click)="onCancel()">
        Huỷ
      </button>
      <button mat-flat-button (click)="onAccept()">Đồng ý</button>
    </div>
  `,
})
export class ConfirmComponent implements OnInit {
  @Input() title: string = '';
  @Input() content: string = '';
  @Output() isConfirm = new EventEmitter<boolean>(false);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  onCancel() {}

  onAccept() {
    this.isConfirm.emit(true);
  }
}
