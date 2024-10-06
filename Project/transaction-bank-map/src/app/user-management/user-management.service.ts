import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import {
  CreateOrUpdateUser,
  QueryParams,
  UserPaging,
} from './user-management.model';
import { ResponseApi } from '../share/common';

@Injectable()
export class UserManagementService {
  private readonly _http = inject(HttpClient);

  getPaging(params: QueryParams) {
    const prQuery = new HttpParams({ fromObject: { ...params } });
    return this._http.get<ResponseApi<UserPaging>>(
      `${environment.apiUrl}/users`,
      { params: prQuery }
    );
  }

  create(user: CreateOrUpdateUser) {
    return this._http.post(`${environment.apiUrl}/users`, user);
  }

  update(userId: string, model: CreateOrUpdateUser) {
    return this._http.put(`${environment.apiUrl}/users/${userId}`, model);
  }

  remove(userId: string) {
    return this._http.delete(`${environment.apiUrl}/users/${userId}`);
  }

  getCode() {
    return this._http.get<ResponseApi<string>>(`${environment.apiUrl}/users/get-code`);
  }
}
