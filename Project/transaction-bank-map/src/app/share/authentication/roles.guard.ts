import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

export const roles: CanActivateFn = (route, state) => {
  const _ls = inject(LocalStorageService);
  const _router = inject(Router);
  return _ls.getCurrentUser()?.accessToken ? _router.navigate(['/map']).then(() => true) : true;
};
