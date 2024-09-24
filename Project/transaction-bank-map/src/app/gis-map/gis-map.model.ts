export namespace GisMap {
  export enum Status {
    BaoTri,
    HoatDong,
    DongCua,
  }

  export const StatusList = [
    { name: 'Bảo trì', value: GisMap.Status.BaoTri },
    { name: 'Hoạt động', value: GisMap.Status.HoatDong },
    { name: 'Đóng cửa', value: GisMap.Status.DongCua },
  ];

  export interface TransactionPopUp {
    name: string;
    status: string,
    upTime: string,
    customerQty: number,
    employeeQty: number,
    totalCost: number,
    latestMaintain: number,
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



