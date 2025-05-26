import { Component } from '@angular/core';
import {RoomsComponent} from '@company/core/home-view/components/rooms/rooms.component';
import {AuthService} from '@company/guards/auth.service';

@Component({
  selector: 'app-home-view',
  imports: [
    RoomsComponent
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {
  isLoggedIn = false;
  username = '';

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = await this.authService.getUsername();
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
