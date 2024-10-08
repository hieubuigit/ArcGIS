import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TransactionOffice } from './transaction-office.model';
import { Paging, ResponseApi } from '../share/common';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionOfficeService {
  private readonly _http = inject(HttpClient);

  getPaging(params: Paging) {
    const prQuery = new HttpParams({ fromObject: { ...params } });
    return this._http.get<ResponseApi<TransactionOffice.Response>>(
      `${environment.apiUrl}/transaction-office`,
      { params: prQuery }
    );
  }

  create(transOff: TransactionOffice.CreateOrUpdate) {
    return this._http.post(`${environment.apiUrl}/transaction-office`, transOff);
  }

  update(id: string, model: TransactionOffice.CreateOrUpdate) {
    return this._http.put(`${environment.apiUrl}/transaction-office/${id}`, model);
  }

  remove(userId: string) {
    return this._http.delete(`${environment.apiUrl}/transaction-office/${userId}`);
  }

  getCode() {
    return this._http.get<ResponseApi<string>>(`${environment.apiUrl}/transaction-office/get-code`);
  }

  getWard() {
    return this._http.get<ResponseApi<TransactionOffice.WardResponse>>(
      `${environment.apiUrl}/ward`,
    );
  }

  getOneTransOffice(id: string) {
    return this._http.get<TransactionOffice.WardResponse>(
      `${environment.apiUrl}/transaction-office`,
    );
  }

}
