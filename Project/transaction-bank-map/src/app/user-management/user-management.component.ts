import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  GenderItems,
  sampleUsers,
  User,
  UserStatusItems,
  UserTypeItems,
} from './user-management.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateOrUpdateUserPopupComponent } from './create-or-update-user-popup/create-or-update-user-popup.component';
import { Paging, PopUpType } from '../share/common';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from '../share/confirm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MapNameEnumPipe } from '../share/map-name-enum.pipe';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MapNameEnumPipe,
  ],
  providers: [MatDialog],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent {
  sampleData: User[] = sampleUsers;
  displayedColumns: string[] = [
    'code',
    'email',
    'phone',
    'fullName',
    'userName',
    'userType',
    'status',
    'createdDate',
    'updatedDate',
    'action',
  ];

  dataSource = signal<MatTableDataSource<User>>(
    new MatTableDataSource<User>(this.sampleData)
  );

  paging: Paging = {
    pageIndex: 1,
    pageSize: 5,
  };

  userTypeItems = UserTypeItems;
  genderItems = GenderItems;
  userStatusItems = UserStatusItems;

  constructor(private _dialog: MatDialog) {}

  onAdd() {
    this._dialog.open(CreateOrUpdateUserPopupComponent, {
      width: '700px',
      data: { popupType: PopUpType.Add },
    });
  }

  onEdit(el: User) {
    const dialogRef = this._dialog.open(CreateOrUpdateUserPopupComponent, {
      width: '700px',
      data: { popupType: PopUpType.Update, rowData: el },
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('user update: ', res);
    });
  }

  onDelete(el: User) {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      width: '700px',
      data: {
        title: `Bạn có chắc chắn muốn xóa User ${el.userId} không? `,
        content:
          'Hành động này không thể hoàn tác. Use sẽ bị xóa ra khỏi hệ thống vĩnh viễn.',
        popupType: PopUpType.Delete,
      },
    });

    dialogRef.afterClosed().subscribe((isAccept) => {
      if (isAccept) {
        console.log('Is Accept:', isAccept);
      }
    });
  }

  handlePaging(event: PageEvent) {
    console.log(event);
  }
}
