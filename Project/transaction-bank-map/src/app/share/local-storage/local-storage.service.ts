import { Injectable } from '@angular/core';
import { Login } from '../../user-authentication/login/login.model';
import { isAvailable } from '../common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  readonly currentUserKey = 'currentUser';

  constructor() { }

  setCurrentUser(data: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(data));
  }

  getCurrentUser() {
    if (!localStorage.getItem(this.currentUserKey)) return;
    return JSON.parse(localStorage.getItem(this.currentUserKey) ?? "") as Login.Response;
  }

  clearCurrentUser() {
    localStorage.removeItem(this.currentUserKey);
  }

  isExistToken() {
    return isAvailable(this.getCurrentUser()?.accessToken ?? false);
  }
}
