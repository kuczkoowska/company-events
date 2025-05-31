import { Module } from '@nestjs/common';
import { KeycloakConnectModule, ResourceGuard, RoleGuard, AuthGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        KeycloakConnectModule.register({
            authServerUrl: 'http://localhost:8080',
            realm: 'events-realm',
            clientId: 'company-events-backend',
            secret: 'secret',
        }),
    ],
    providers: [
        // These are global guards that will protect all endpoints
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
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
export class KeycloakModule {}