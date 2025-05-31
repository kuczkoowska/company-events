import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HasRolesDirective, KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs} from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, HasRolesDirective],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  public authenticated = false;
  private readonly keycloak = inject(Keycloak);

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    })
  }


  isAdmin(): boolean {
    return this.keycloak.authenticated && this.keycloak.hasRealmRole('admin')
  } // przez pipe przekazywac role do komponentu

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }
 }
