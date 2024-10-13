import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { LoadingService } from '../ui/spinner/loading.service';
import { SnackbarService, SnackbarStatus } from '../ui/snackbar-notification/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private readonly _loadingSvc: LoadingService,
    private readonly _snackbarSvc: SnackbarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingSvc.addRequest();
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          let statusCode = event.status;
          if (event.body.data.totalPage) {
            statusCode = 999;
          }
          switch (statusCode) {
            case 999:
              this._snackbarSvc.show(SnackbarStatus.LoadDataSuccess);
              break;
            case 200:
              this._snackbarSvc.show(SnackbarStatus.UpdateSuccess);
              break
            case 500:
              this._snackbarSvc.show(SnackbarStatus.InternalError);
              break;
            default:
              break;
          }
        }
      }),
      finalize(() => {
        this._loadingSvc.removeRequest();
      })
    );
  }

}
