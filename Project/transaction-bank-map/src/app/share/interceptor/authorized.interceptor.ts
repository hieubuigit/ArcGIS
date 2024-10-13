import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { environment } from '../../../environment/environment';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedInterceptorService implements HttpInterceptor {
  constructor(
    private readonly _lsSvc: LocalStorageService,
    private readonly _router: Router,
    private readonly _activeRoute: ActivatedRoute
  ) {}

  private excludedUrls: string[] = [
    `${environment}/api/transaction-office`,
    `${environment}/api/ward`,
  ];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const isGuestMap =
      this._activeRoute.snapshot.firstChild?.routeConfig?.path === 'guest-map';
    const isExcept = this.excludedUrls.some((url) => req.url === url);

    const token = this._lsSvc.getCurrentUser()?.accessToken;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          this._router.navigate(['/admin']);
        }
        return throwError(err);
      })
    );
  }
}
