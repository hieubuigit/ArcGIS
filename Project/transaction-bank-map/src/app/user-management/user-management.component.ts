import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateOrUpdateUserPopupComponent } from './create-or-update-user-popup/create-or-update-user-popup.component';
import { Paging, PopUpType } from '../share/common';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from '../share/confirm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MapNameEnumPipe } from '../share/map-name-enum.pipe';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserManagementService } from './user-management.service';
import {
  User,
  UserTypeItems,
  GenderItems,
  UserStatusItems,
  columns,
} from './user-management.model';
import { HttpClientModule } from '@angular/common/http';
import { MillisecondsToDatePipe } from '../share/pipes/milliseconds-to-date.pipe';

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
    HttpClientModule,
    MillisecondsToDatePipe,
  ],
  providers: [MatDialog, UserManagementService],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = columns;
  dataSource = signal<MatTableDataSource<User>>(new MatTableDataSource<User>());

  paging: Paging = {
    page: 1,
    pageSize: 5,
  };

  userTypeItems = UserTypeItems;
  genderItems = GenderItems;
  userStatusItems = UserStatusItems;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _userSvc: UserManagementService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const queryParams = {
      ...this.paging,
      keyword: '',
      role: '',
      status: '',
    };
    this._userSvc.getPaging(queryParams).subscribe({
      next: (res) => {
        this.paging.totalPage = res.data.totalPage;
        this.dataSource.set(new MatTableDataSource(res?.data.users));
        this.dataSource().sort = this.sort;
        this.dataSource().paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onAdd() {
    this._userSvc.getCode().subscribe({
      next: (resp) => {
        if (resp) {
          const dialogRef = this._dialog.open(
            CreateOrUpdateUserPopupComponent,
            {
              width: '700px',
              data: { popupType: PopUpType.Add, code: resp.data },
            }
          );
          dialogRef.afterClosed().subscribe((userModel) => {
            if (userModel) {
              this._userSvc.create(userModel).subscribe({
                next: (result) => {
                  this.fetchData();
                },
                error: (err) => {
                  console.log(err);
                },
              });
            }
          });
        }
      },
      error: (err) => {},
    });
  }

  onEdit(code: string) {
    const rowData = this.dataSource().data.find((i) => i.code === code);
    if (rowData) {
      const dialogRef = this._dialog.open(CreateOrUpdateUserPopupComponent, {
        width: '700px',
        data: { popupType: PopUpType.Update, rowData: rowData },
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          rowData!.code = res.code;
          rowData!.email = res.email;
          rowData!.username = res.username;
          rowData!.fullName = res.fullName;
          rowData!.phoneNumber = res.phoneNumber;
          rowData!.gender = res.gender;
          rowData!.address = res.address;
          rowData!.role = res.role;
          this._userSvc.update(rowData.id, rowData).subscribe({
            next: (result) => {
              this.fetchData();
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      });
    }
  }

  onDelete(el: User) {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      width: '700px',
      data: {
        title: `Bạn có chắc chắn muốn xóa User ${el.fullName} không? `,
        content:
          'Hành động này không thể hoàn tác. Use sẽ bị xóa ra khỏi hệ thống vĩnh viễn.',
        popupType: PopUpType.Delete,
      },
    });
    dialogRef.afterClosed().subscribe((isAccept) => {
      if (isAccept) {
        this._userSvc.remove(el.id).subscribe({
          next: (result) => {
            this.fetchData();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  handlePaging(event: PageEvent) {
    this.paging.page = event.pageIndex + 1;
    this.paging.pageSize = event.pageSize;
    this.fetchData();
  }

  sortData(sort: Sort) {
    console.log(sort);
  }
}
