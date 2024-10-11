import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZoneChangeDetection } from '@angular/core';
import { AuthorizedInterceptorService } from './app/share/interceptor/authorized.interceptor';
import { LoadingInterceptor } from './app/share/interceptor/loading.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizedInterceptorService,
      multi: true
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideRouter(routes),
  ],
});

