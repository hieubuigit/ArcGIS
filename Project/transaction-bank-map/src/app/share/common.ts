export interface SelectItem<T> {
  name: string;
  value: T;
}

export enum PopUpType {
  Add,
  Update,
  Delete,
  Logout,
}

export interface Paging {
  pageIndex: number,
  pageSize: number,
  keySort?: string,
  sortDesc?: boolean,
}
