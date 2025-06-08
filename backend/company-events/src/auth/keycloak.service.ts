import {Module} from '@nestjs/common';
import {KeycloakConnectModule, ResourceGuard, RoleGuard} from 'nest-keycloak-connect';
import {APP_GUARD} from '@nestjs/core';
import {KeycloakAuthGuard} from "./keycloak-auth.guard";

@Module({
    imports: [
        KeycloakConnectModule.register({
            authServerUrl: 'http://keycloak:8080',
            realm: 'events-realm',
            clientId: 'company-events-backend',
            secret: 'AvmM7M1OGt9WSsNLi135tigRvihwyWVx',
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