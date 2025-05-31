import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const requiredRoles: string[] = route.data['role'];
  console.log('requiredRoles', requiredRoles);
  console.log('grantedRoles', grantedRoles);
  if (!requiredRoles || requiredRoles.length === 0) {
    return false;
  }

  const hasRequiredRole = requiredRoles.some(role => grantedRoles.realmRoles.includes(role));


  if (authenticated && hasRequiredRole) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
