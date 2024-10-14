import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

export const userAuthenticationGuard: CanActivateFn = (route, state) => {
  const _ls = inject(LocalStorageService);
  const _router = inject(Router);
  const _activeRoute = inject(ActivatedRoute);
  return _ls.getCurrentUser()?.accessToken ? true : _router.navigate(['/admin']).then(() => false);
};
