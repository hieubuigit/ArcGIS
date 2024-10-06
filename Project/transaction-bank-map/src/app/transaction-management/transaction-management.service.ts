import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Paging, ResponseApi } from '../share/common';
import { environment } from '../../environment/environment';
import { TransactionPaging } from './transaction-management.model copy';

@Injectable()
export class TransactionManagementService {
  private readonly _http = inject(HttpClient);

  getPaging(params: Paging) {
    const prQuery = new HttpParams({ fromObject: { ...params } });
    return this._http.get<ResponseApi<TransactionPaging>>(`${environment.apiUrl}/ticket`, { params: prQuery });
  }
}
