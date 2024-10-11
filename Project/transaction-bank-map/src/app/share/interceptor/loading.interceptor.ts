import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../ui/spinner/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private readonly _loadingSvc: LoadingService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingSvc.addRequest();
    return next.handle(req).pipe(
      finalize(() => {
        this._loadingSvc.removeRequest();
      })
    );
  }

}
