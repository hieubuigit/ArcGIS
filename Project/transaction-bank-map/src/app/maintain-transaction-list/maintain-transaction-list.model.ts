import { GisMap } from '../gis-map/gis-map.model';
import { Paging, SelectItem } from '../share/common';
import { TransactionOffice } from '../transaction-management/transaction-management.model';

export namespace MaintainTransaction {
  export interface Request extends Paging {}

  export interface Response {
    id: string;
    code: string;
    maintenanceName: string;
    maintenanceDescriptions: string;
    maintenaceStatus: MaintainStatus;
    maintenanceCost: 1000000;
    startTime: number;
    endTime: number;
    officeId: string;
    createdAt: number;
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

  export interface Update {
    maintenanceName: string;
    maintenanceDescriptions: string;
    maintenanceCost: number;
    maintenaceStatus: MaintainTransaction.MaintainStatus;
    startTime: number;
    endTime: number;
    officeId: string;
  }

  export interface MaintainPaging {
    total: number;
    totalPage: number;
    maintenances: Response[];
  }

  export enum MaintainStatus {
    Doing,
    Finished,
    Cancel,
  }

  export const MaintainItems: SelectItem<MaintainStatus>[] = [
    { name: 'Đang thực hiện', value: MaintainStatus.Doing },
    { name: 'Hoàn thành', value: MaintainStatus.Finished },
    { name: 'Huỷ bỏ', value: MaintainStatus.Cancel },
  ];
}
