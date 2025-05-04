import { Component } from '@angular/core';
import {RoomsComponent} from '@company/core/home-view/components/rooms/rooms.component';

@Component({
  selector: 'app-home-view',
  imports: [
    RoomsComponent
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {

}
