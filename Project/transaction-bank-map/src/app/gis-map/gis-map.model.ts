import { TransactionOffice } from "../transaction-office/transaction-office.model";

export namespace GisMap {

  export const StatusList = [
    { name: 'Bảo trì', value: TransactionOffice.Status.Maintain },
    { name: 'Hoạt động', value: TransactionOffice.Status.Active },
    { name: 'Đóng cửa', value: TransactionOffice.Status.Closed },
  ];

  export interface TransactionPopUp {
    name: string;
    status: string,
    upTime: string,
    customerQty: number,
    employeeQty: number,
    totalCost: number,
    latestMaintain: string,
   }

  export interface WardPopUp {
    name: string,
  }

  export interface MapControl {
    year: number,
    showCloseTransaction: boolean,
    showWard: boolean,
  }
}



