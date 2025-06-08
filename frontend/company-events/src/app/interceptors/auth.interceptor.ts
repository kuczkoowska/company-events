import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import Keycloak from 'keycloak-js';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(Keycloak);
  const token: string = keycloak.token

  const tokenReq = req.clone({
    setHeaders: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
  });

  return next(tokenReq);
};
