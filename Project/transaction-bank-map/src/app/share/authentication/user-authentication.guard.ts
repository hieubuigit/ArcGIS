import { CanActivateFn } from '@angular/router';

export const userAuthenticationGuard: CanActivateFn = (route, state) => {
  return true;
};
