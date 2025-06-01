import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideKeycloak, withAutoRefreshToken, AutoRefreshTokenService, UserActivityService, KeycloakService } from 'keycloak-angular';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'http://localhost:8080',
      realm: 'events-realm',
      clientId: 'angular-client'
    },
    initOptions: {
      onLoad: 'check-sso',
      checkLoginIframe: false,
      // silentCheckSsoRedirectUri: window.location.origin + '/public/silent-check-sso.html?v='+ new Date().getTime(),
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
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    KeycloakService // Explicitly provide KeycloakService
  ]
};
