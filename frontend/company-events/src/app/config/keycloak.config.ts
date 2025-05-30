export const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'events-realm',
  clientId: 'angular-client',
  silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  checkLoginIframe: true,
  checkLoginIframeInterval: 25
};