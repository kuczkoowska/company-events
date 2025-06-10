import {Module} from '@nestjs/common';
import {KeycloakConnectModule, ResourceGuard, RoleGuard, TokenValidation} from 'nest-keycloak-connect';
import {APP_GUARD} from '@nestjs/core';
import {KeycloakAuthGuard} from "./keycloak-auth.guard";

// @ts-ignore
@Module({
    imports: [
        KeycloakConnectModule.register({
            authServerUrl: 'http://localhost/auth',
            realm: 'events-realm',
            clientId: 'company-events-backend',
            secret: process.env.KEYCLOAK_SECRET || '',
            tokenValidation: TokenValidation.OFFLINE,
            realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvAbD6XdFMzw0x8BX9tH18YwPN/yrTYiEH8zyfh2kqMqV0PZYldDHU5hI4Wrsa8MOoeXn3TO2zR2eQBaHlt9N3iTyBf2/KRMihEop2G+WHeUPpVEQDlt2C5FuBJx+F63EmRSSXYrk3Z3tLKno4gMOhKMXte6reVLeOsiAtX/K7+vpWCzi1DgPO+JvRAY8mk+8CSvUSbLEARiE5sFYwiKB/GCwiZPYtbVA4OKCE1E4g39rPgPzDc1qYP3qll+T0yg7jA/VaqtSAfRD3Y+m+OnHaQoH0HtVQIkpZONjlCufXroLU9a8+iyrQFqZ0Uyz/IAI2gOBU8YSMrScFDRxxL6aqQIDAQAB',
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