import { CommonModule } from '@angular/common';
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
import { Paging, PopUpType } from '../share/common';
import { CreateOrUpdateScheduleMaintainPopupComponent } from './create-or-update-schedule-maintain-popup/create-or-update-schedule-maintain-popup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaintainTransactionListService } from './maintain-transaction-list.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

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
  ],
  providers: [MaintainTransactionListService],
  templateUrl: './maintain-transaction-list.component.html',
})
export class MaintainTransactionListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'maintainCode',
    'maintainName',
    'description',
    'cost',
    'latestUpdate',
    'createdDate',
    'createdBy',
    'updatedDate',
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

  constructor(
    private _dialog: MatDialog,
    private _maintainSvc: MaintainTransactionListService
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
    this._dialog.open(CreateOrUpdateScheduleMaintainPopupComponent, {
      width: '700px',
      data: { popupType: PopUpType.Add },
    });
  }

  onEdit() {
    this._dialog.open(CreateOrUpdateScheduleMaintainPopupComponent, {
      width: '700px',
      data: { popupType: PopUpType.Update },
    });
  }

  handlePaging(event: PageEvent) {
    console.log(event);
    // call api here
    this.fetchData();
  }
}
