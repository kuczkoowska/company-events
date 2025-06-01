import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;
  const router = inject(Router);

  if (!authenticated) {
    return router.parseUrl('/about');
  }

  const requiredRoles: string[] = route.data['role'];

  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // Allow access if no roles are required
  }

  // Check if user has any of the required roles
  const hasRequiredRole = requiredRoles.some(role =>
    grantedRoles.realmRoles?.includes(role)
  );

  return hasRequiredRole ? true : router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
