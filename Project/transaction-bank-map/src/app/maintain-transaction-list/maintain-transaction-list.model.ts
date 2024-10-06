import { GisMap } from '../gis-map/gis-map.model';
import { Paging } from '../share/common';
import { TransactionOffice } from '../transaction-management/transaction-management.model';

export namespace MaintainTransaction {
  export interface Request extends Paging {}

  export interface Response {
    id: string;
    code: string;
    maintenanceName: string;
    maintenanceDescriptions: string;
    maintenaceStatus: GisMap.Status;
    maintenanceCost: 1000000;
    startTime: number;
    endTime:  number;
    officeId: string;
    createdAt:  number;
    createdBy: string;
    updatedAt: null;
    updatedBy: null;
    transactionOffice: TransactionOffice;
    createdUser: {
      id: string;
      username: string;
      fullName: string;
    };
    updatedUser: {
      id: string;
      username: string;
      fullName: string;
    } | null;
  }

  export interface MaintainPaging {
    total: number;
    totalPage: number;
    maintenances: Response[];
  }
}
