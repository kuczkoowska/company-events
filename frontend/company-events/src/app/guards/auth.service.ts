import { Injectable } from '@angular/core';
// import { KeycloakService } from 'keycloak-angular';
// import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // constructor(private keycloak: KeycloakService) {}

  // // Trigger Keycloak login
  // async login(): Promise<void> {
  //   await this.keycloak.login();
  // }

  // // Trigger Keycloak logout
  // async logout(): Promise<void> {
  //   await this.keycloak.logout();
  // }

  // // Get logged-in user's username
  // async getUsername(): Promise<string> {
  //   try {
  //     const profile: KeycloakProfile = await this.keycloak.loadUserProfile();
  //     return profile?.username ?? '';
  //   } catch (error) {
  //     console.error('Failed to load user profile:', error);
  //     return '';
  //   }
  // }

  // // Check if user is logged in
  // isLoggedIn(): Promise<boolean> {
  //   return Promise.resolve(this.keycloak.isLoggedIn());
  // }

  // // Get user's Keycloak roles
  // getRoles(): string[] {
  //   return this.keycloak.getUserRoles();
  // }

  // // (Optional) Get current access token
  // getToken(): Promise<string> {
  //   return this.keycloak.getToken();
  // }
}
