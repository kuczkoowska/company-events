import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from 'nest-keycloak-connect';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakAuthGuard extends AuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];

        if (token) {
            const decodedToken = jwt.decode(token);

            const keycloakConfig = {
                'auth-server-url': 'http://localhost/auth',
                'realm': 'events-realm'
            };

            console.log("Expected issuer:", keycloakConfig["auth-server-url"] + '/realms/' + keycloakConfig["realm"]);
            console.log("Actual token issuer:", decodedToken?.iss);
        }

        return super.canActivate(context);
    }
}