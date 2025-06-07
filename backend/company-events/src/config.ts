// import * as fs from 'fs';
//
// function readSecret(path: string, fallback?: string): string | undefined {
//     try {
//         return fs.readFileSync(path, 'utf8').trim();
//     } catch {
//         return fallback;
//     }
// }
//
// export const dbUser = readSecret('/run/secrets/db_user');
// export const dbPassword = readSecret('/run/secrets/db_password');
// export const keycloakAdmin = readSecret('/run/secrets/keycloak_admin');
// export const keycloakPassword = readSecret('/run/secrets/keycloak_admin_password');
// export const keycloakDbUser = readSecret('/run/secrets/keycloak_db_user');
// export const keycloakDbPassword = readSecret('/run/secrets/keycloak_db_password');
// export const keycloak_client_secret = readSecret('/run/secrets/keycloak_client_secret');