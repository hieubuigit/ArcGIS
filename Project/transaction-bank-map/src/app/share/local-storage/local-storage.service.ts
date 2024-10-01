import { Injectable } from '@angular/core';
import { Login } from '../../user-authentication/login/login.model';

@Injectable()
export class LocalStorageService {

  readonly currentUserKey = 'currentUser';

  constructor() { }

  setCurrentUser(data: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(data));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentUserKey) ?? '') as Login.Response;
  }
}
