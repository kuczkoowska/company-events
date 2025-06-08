import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<KeycloakProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly API_URL = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {
    this.initUserProfile();
  }

  private initUserProfile(): void {
    let loggedIn = this.keycloakService.isLoggedIn();
    if (loggedIn) {
      this.keycloakService.loadUserProfile().then((profile) => {
        this.currentUserSubject.next(profile);
      });
    }
  }


  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout().then(() => {
      this.currentUserSubject.next(null);
    });
  }

  getUser(): Observable<KeycloakProfile | null> {
    return of(this.keycloakService.isLoggedIn()).pipe(
      switchMap(loggedIn => {
        if (loggedIn) {
          return from(this.keycloakService.loadUserProfile()).pipe(
            tap(profile => this.currentUserSubject.next(profile)),
            catchError(error => {
              console.error('Error loading user profile:', error);
              return of(null);
            })
          );
        }
        return of(null);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.keycloakService.isLoggedIn());
  }

  getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  hasRole(role: string): boolean {
    return this.keycloakService.getUserRoles().includes(role);
  }
}
