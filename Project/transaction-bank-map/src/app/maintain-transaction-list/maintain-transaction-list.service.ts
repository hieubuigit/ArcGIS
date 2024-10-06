import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Paging, ResponseApi } from '../share/common';
import { MaintainTransaction } from './maintain-transaction-list.model';
import { environment } from '../../environment/environment';

@Injectable()
export class MaintainTransactionListService {
  constructor(private _http: HttpClient) {}

  getPaging(params: Paging) {
    const prQuery = new HttpParams({ fromObject: { ...params } });
    return this._http.get<ResponseApi<MaintainTransaction.MaintainPaging>>(
      `${environment.apiUrl}/users`,
      { params: prQuery }
    );
  }

  create(model: MaintainTransaction.Response) {
    return this._http.post(`${environment.apiUrl}/maintenance`, model);
  }

  update(id: string, model: MaintainTransaction.Response) {
    return this._http.put(`${environment.apiUrl}/maintenance/${id}`, model);
  }

  remove(id: string) {
    return this._http.delete(`${environment.apiUrl}/maintenance/${id}`);
  }

  getCode() {
    return this._http.get<ResponseApi<string>>(`${environment.apiUrl}/maintenance/get-code`);
  }
}
