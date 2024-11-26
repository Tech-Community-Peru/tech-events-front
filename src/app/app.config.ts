import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import { routes } from './app.routes';
import {jwtInterceptor} from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideAnimationsAsync(), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([jwtInterceptor])), provideAnimationsAsync()
  ]
};
