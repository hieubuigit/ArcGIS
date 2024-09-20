import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Ticket } from './ticket-managemnt.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-ticket-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './ticket-management.component.html',
  styleUrl: './ticket-management.component.scss'
})
export class TicketManagementComponent {

sampleTransactions: Ticket[] = [];
  displayedColumns: string[] = [
   'id',
  'name',
  'totalUserPerDay',
  'totalUserNow',
  'createdDate',
  'updateDate',
  ];

sampleData = [
];

  dataSource = signal<MatTableDataSource<Ticket>>(
    new MatTableDataSource<Ticket>(this.sampleTransactions)
  );

onEdit() {

}

onDelete() {

}

}
