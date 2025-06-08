import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from '@angular/core';
import {AuthGuardData, createAuthGuard} from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const {authenticated, grantedRoles} = authData;
  const requiredRoles: string[] = route.data['role'];

  if (!requiredRoles || requiredRoles.length === 0) {
    return false;
  }

  const userRoles = grantedRoles.realmRoles ?? [];

  const hasAnyRequiredRole = requiredRoles.some(role =>
    userRoles.includes(role)
  );

  if (authenticated && hasAnyRequiredRole) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/about');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
