import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { sampleData, Transaction } from './transaction-management.model';
import { Router, RouterLink } from '@angular/router';
import { Paging } from '../share/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  ],
  templateUrl: './transaction-management.component.html',
})
export class TransactionManagementComponent implements OnInit {
  sampleTransactions: Transaction[] = sampleData;
  displayedColumns: string[] = [
    'id',
    'name',
    'totalUserPerDay',
    'totalUserNow',
    'createdDate',
    'updatedDate',
  ];

  isLoadingResults = false;
  paging: Paging = {
    pageIndex: 1,
    pageSize: 5,
  };

  dataSource = signal<MatTableDataSource<Transaction>>(
    new MatTableDataSource<Transaction>(this.sampleTransactions)
  );

  constructor(private _router: Router){}

  ngOnInit(): void {
    // this.fetchData();
  }

  onEdit() {}

  onDelete() {}

  fetchData() {
    // this._httpClient.get('example').subscribe({
    //   next: resp => {
    //     console.log(resp);
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // })
  }

handlePaging(event: PageEvent) {

}

}
