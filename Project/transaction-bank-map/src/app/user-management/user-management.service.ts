import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { CreateOrUpdateUser, QueryParams, User } from './user-management.model';

@Injectable()
export class UserManagementService {

  private readonly _http = inject(HttpClient);

  getPaging(params: QueryParams) {
    const prQuery = new HttpParams({fromObject: {...params}});
    return this._http.get<User[]>(`${environment.apiUrl}/auth/login`, {params: prQuery});
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
}
