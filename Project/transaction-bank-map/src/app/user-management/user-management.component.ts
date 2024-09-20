import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from './user-management.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {

sampleTransactions: User[] = [];
  displayedColumns: string[] = [
  'id',
  'code',
  'email',
  'fullName',
  'userType',
  'status',
  'createdDate',
  'updatedDate',
  ];

sampleData = [
];

  dataSource = signal<MatTableDataSource<User>>(
    new MatTableDataSource<User>(this.sampleTransactions)
  );

onEdit() {

}

onDelete() {

}

}
