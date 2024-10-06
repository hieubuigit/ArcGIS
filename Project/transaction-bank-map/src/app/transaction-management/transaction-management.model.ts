import { Paging } from '../share/common';

export interface Transaction {
  id: number;
  name: string;
  totalUserPerDay: number;
  totalUserNow: number;
  createdAt: string;
  updatedAt: string;
}

export interface QueryParams extends Paging {
  searchKey: string;
  role: string;
  status: string;
}

export interface TransactionPaging {
  total: number;
  totalPage: number;
  tickets: CustomerOffice[];
}

export interface TransactionOffice {
  id: string;
  code: string;
  officeName: string;
  officeDescriptions: string;
  officeAddress: string;
  officeCost: number;
  officeStatus: string;
  latitude: string;
  longitude: string;
  countEmployee: number;
  officeUptime: string;
  wardId: string;
  createdAt: number;
  createdBy: string;
  updatedAt: number | null;
  updatedBy: string;
}

export interface CustomerOffice {
  id: string;
  countCustomer: number;
  countCustomerNow: number;
  officeId: string;
  createdAt: number;
  updatedAt: number | null;
  transactionOffice: TransactionOffice;
}
