import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { Paging } from '../share/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  CustomerOffice,
} from './transaction-management.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { TransactionManagementService } from './transaction-management.service';
import { MillisecondsToDatePipe } from '../share/pipes/milliseconds-to-date.pipe';

@Component({
  selector: 'app-transaction-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinnerModule,
    HttpClientModule,
    MillisecondsToDatePipe,
    MatSortModule,
  ],
  providers: [TransactionManagementService],
  templateUrl: './transaction-management.component.html',
})
export class TransactionManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'name',
    'totalUserPerDay',
    'totalUserNow',
    'createdAt',
    'updatedAt',
  ];

  isLoadingResults = false;
  paging: Paging = {
    page: 1,
    pageSize: 5,
  };
  dataSource = signal<MatTableDataSource<CustomerOffice>>(
    new MatTableDataSource<CustomerOffice>()
  );
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly _transSvc: TransactionManagementService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._transSvc.getPaging(this.paging).subscribe({
      next: (resp) => {
        this.dataSource.set(new MatTableDataSource(resp.data.tickets));
        this.dataSource().paginator = this.paginator;
        this.dataSource().sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handlePaging(event: PageEvent) {
    this.paging.page = event.pageIndex + 1;
    this.paging.pageSize = event.pageSize;
    this.fetchData();
  }
}
