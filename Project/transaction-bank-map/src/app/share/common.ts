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
  page: number;
  pageSize: number;
  searchKey?: string;
  status?: string;
  keySort?: string;
  sortDesc?: boolean;
  totalPage?: number;
}

export interface ResponseApi<T> {
  data: T;
  message: string;
  status: number;
}

export const isAvailable = (value: any): boolean =>
  value !== null && value !== undefined && value !== '';

export const formatDateTimeFromMilliSecond = (milliseconds: number) => {
  const date = new Date(milliseconds * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
  };
};

export const getDateTimeFromStr = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};
