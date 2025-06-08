import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from 'nest-keycloak-connect';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakAuthGuard extends AuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get the request
        const request = context.switchToHttp().getRequest();

        // Extract token from Authorization header
        const token = request.headers.authorization?.split(' ')[1];

        if (token) {
            // Decode token without verification to access payload
            const decodedToken = jwt.decode(token);

            // Get Keycloak config from your module
            const keycloakConfig = {
                'auth-server-url': 'http://keycloak:8080',
                'realm': 'events-realm'
            };

            console.log("Expected issuer:", keycloakConfig["auth-server-url"] + '/realms/' + keycloakConfig["realm"]);
            console.log("Actual token issuer:", decodedToken?.iss);
        }

        // Continue with the original guard behavior
        return super.canActivate(context);
    }
}