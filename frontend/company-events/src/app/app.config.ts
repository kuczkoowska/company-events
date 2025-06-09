import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {
  AutoRefreshTokenService,
  KeycloakService,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken
} from 'keycloak-angular';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {tokenInterceptor} from '@company/interceptors/auth.interceptor';

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'http://localhost',
      realm: 'events-realm',
      clientId: 'angular-client'
    },
    initOptions: {
      onLoad: 'check-sso',
      checkLoginIframe: true,
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      // enableLogging: true,
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
  });

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    KeycloakService,
  ]
};
