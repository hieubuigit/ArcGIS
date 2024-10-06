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
  page: number,
  pageSize: number,
  searchKey?: string;
  status?: string;
  keySort?: string,
  sortDesc?: boolean,
  totalPage?: number,
}

export interface ResponseApi<T> {
  data: T;
  message : string;
  status: number;
}

export const isAvailable = (value: any) : boolean => (value !== null && value !== undefined && value !== '');
