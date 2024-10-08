import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaintainTransaction } from './maintain-transaction-list.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { getDateTimeFromStr, Paging, PopUpType } from '../share/common';
import { CreateOrUpdateScheduleMaintainPopupComponent } from './create-or-update-schedule-maintain-popup/create-or-update-schedule-maintain-popup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaintainTransactionListService } from './maintain-transaction-list.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MillisecondsToDatePipe } from '../share/pipes/milliseconds-to-date.pipe';
import { MapNameEnumPipe } from '../share/map-name-enum.pipe';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSortModule,
    MatProgressSpinnerModule,
    RouterLink,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    MillisecondsToDatePipe,
    CurrencyPipe,
    MapNameEnumPipe,
  ],
  providers: [MaintainTransactionListService],
  templateUrl: './maintain-transaction-list.component.html',
})
export class MaintainTransactionListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'code',
    'officeName',
    'maintenanceName',
    'maintenanceDescriptions',
    'maintenanceCost',
    'maintenaceStatus',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
    'action',
  ];
  isLoadingResults = false;
  paging: Paging = {
    page: 1,
    pageSize: 5,
  };
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = signal<MatTableDataSource<MaintainTransaction.Response>>(
    new MatTableDataSource<MaintainTransaction.Response>()
  );
  status = MaintainTransaction.MaintainItems;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _maintainSvc: MaintainTransactionListService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isLoadingResults = true;
    this._maintainSvc.getPaging(this.paging).subscribe({
      next: (resp) => {
        this.dataSource.set(new MatTableDataSource(resp.data.maintenances));
        this.dataSource().paginator = this.paginator;
        this.isLoadingResults = false;
      },
      error: (err) => {
        this.isLoadingResults = false;
      },
    });
  }

  onAdd() {
    this._maintainSvc.getCode().subscribe({
      next: (resp) => {
        if (resp) {
          const dialogRef = this._dialog.open(
            CreateOrUpdateScheduleMaintainPopupComponent,
            {
              width: '700px',
              data: { popupType: PopUpType.Add, code: resp.data },
            }
          );
          dialogRef.afterClosed().subscribe((value) => {
            if (value) {
              this._maintainSvc.create(value).subscribe({
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
      const dialogRef = this._dialog.open(
        CreateOrUpdateScheduleMaintainPopupComponent,
        {
          width: '700px',
          data: { popupType: PopUpType.Update, rowData: rowData },
        }
      );
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          rowData.startTime = getDateTimeFromStr(
            res.startDate,
            res.startTime
          ).getTime() / 1000;
          rowData.endTime = getDateTimeFromStr(
            res.endDate,
            res.endTime
          ).getTime() / 1000;
          const model : MaintainTransaction.Update = {
            maintenanceName: res.maintenanceName,
            maintenanceDescriptions: res.maintenanceDescriptions,
            maintenanceCost: res.maintenanceCost,
            maintenaceStatus: rowData.maintenaceStatus,
            startTime: rowData.startTime,
            endTime: rowData.endTime,
            officeId: rowData.officeId
          }
          this._maintainSvc.update(rowData.id, model).subscribe({
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

  handlePaging(event: PageEvent) {
    this.paging.page = event.pageIndex + 1;
    this.paging.pageSize = event.pageSize;
    this.fetchData();
  }

  sortData(sort: Sort) {
    console.log(sort);
  }
}
