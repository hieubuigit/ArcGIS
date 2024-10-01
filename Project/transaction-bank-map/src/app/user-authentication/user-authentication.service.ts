import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from './login/login.model';
import { environment } from '../../environment/environment';

@Injectable()
export class UserAuthenticationService {
  private readonly _http = inject(HttpClient);

  login(account: Login.Request) {
    return this._http.post<Login.Response>(`${environment.apiUrl}/auth/login`, account);
  }

  forgotPassword(email: string) {
    return  null;
  }

  changePassword() {
    return  null;
  }

}
