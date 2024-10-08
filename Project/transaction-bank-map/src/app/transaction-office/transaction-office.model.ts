import { MaintainTransaction } from '../maintain-transaction-list/maintain-transaction-list.model';
import { OnlyCustomerOffice } from '../transaction-management/transaction-management.model';

export namespace TransactionOffice {
  export interface OneTransOffice extends CreateOrUpdate {
    ward: Ward;
    maintenance: MaintainTransaction.Response[];
    ticket: OnlyCustomerOffice;
  }

  export interface Response {
    transactionOffices: CreateOrUpdate;
    total: number;
    totalPage: number;
  }

  export interface CreateOrUpdate {
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

  export interface Ward {
    id: string;
    wardName: string;
    wardDescriptions: string;
    coordinateId: string;
    districtId: string;
    createdAt: number;
    updatedAt: number;
  }

  export interface WardResponse {
    ward: Ward[];
    total: [];
  }

  export enum Status {
    Closed,
    Active,
    Maintain,
  }
}
