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
}


