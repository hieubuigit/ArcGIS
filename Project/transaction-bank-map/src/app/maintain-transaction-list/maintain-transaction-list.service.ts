import { Injectable } from '@angular/core';
import { MaintainTransaction } from './maintain-transaction-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MaintainTransactionListService {
  constructor(private _http: HttpClient) {}

  add(request?: MaintainTransaction.Response) {
    return this._http.post('maintain-transaction', request);
  }

  update(id: number) {
    return this._http.put(`maintain-transaction/${id}`, {});
  }

  getPaging(request: MaintainTransaction.Request) {
    return this._http.get(`maintain-transaction/get-list`);
  }
}
