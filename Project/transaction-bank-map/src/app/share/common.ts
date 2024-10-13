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


/**
 * Format datetime
 */
export const formatDateTimeFromMilliSecond = (milliseconds: number, isNeedSeconds: boolean = false) => {
  const date = new Date(milliseconds * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = isNeedSeconds ? date.getSeconds().toString().padStart(2, '0') : '00';
  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
};

export const getDateTimeFromStr = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};


/***
 * Format currency
 */
 export const formatCurrency = (value: number, country: string) => {
    // Create a currency formatter based on the provided country
    const formatter = new Intl.NumberFormat(country, {
      style: 'currency',
      currency: getCurrencyCode(country)
    });
    return formatter.format(value);
  }

  const getCurrencyCode = (country: string) => {
    const currencyMap: { [key: string]: string } = {
      'US': 'USD',
      'VN': 'VND',
      'GB': 'GBP',
      'EU': 'EUR',
    };
    return currencyMap[country] || 'USD';
  }



