import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/share/interceptor/authorized';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZoneChangeDetection } from '@angular/core';
import { appConfig } from './app/app.config';
import ResizeObserver from 'resize-observer-polyfill';
import { AuthorizedInterceptorService } from './app/share/interceptor/authorized.interceptor';

if (typeof window.ResizeObserver === 'undefined') {
  (window as any).ResizeObserver = ResizeObserver;
}
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    // HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizedInterceptorService,
      multi: true
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
  ],
});

