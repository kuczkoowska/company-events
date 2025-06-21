import {Module} from '@nestjs/common';
import {KeycloakConnectModule, ResourceGuard, RoleGuard, TokenValidation} from 'nest-keycloak-connect';
import {APP_GUARD} from '@nestjs/core';
import {KeycloakAuthGuard} from "./keycloak-auth.guard";

@Module({
    imports: [
        KeycloakConnectModule.register({
            authServerUrl: 'http://myapp.local/keycloak',
            realm: 'events-realm',
            clientId: 'company-events-backend',
            secret: '2LEDYpARtkeKAGk2sptVBsogJ1eRHmR4',
            tokenValidation: TokenValidation.OFFLINE,
            realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn9CYX2t5XFloEn/bos/m6nvdj2ZbriQH1bFLaz0y9qX7mGlTsPCZhZPBauRsY5tvQlymMJ6HnqYAMV69CuNX1giZwfqYk8kp/XfGwH+0CiBe8AIL2WFgbZhh2PtknaIzR30PkhqwkdViZ3CzuvScsdSLfWjiX5nxgvuXU1g+x49msPC0RWRRQO8psdyQdbh1AiIyPnw0hP8EkY2MwpbEcIg8yDCMZ1t8MJZajd1a/+g9GfamW2QO9PYhrwN3t0U9f2BSyAH1SkERWanKd5rqGLlmgihLcL9ilUG0OFlOVA/iemBfyL8JKorUEaCs834yktNI/gkky4J9k8eZ3aA3jQIDAQAB',
        }),
    ],
    providers: [
        // These are global guards that will protect all endpoints
        {
            provide: APP_GUARD,
            // useClass: AuthGuard,
            useClass: KeycloakAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class KeycloakModule {
}