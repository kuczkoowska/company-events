import { Component } from '@angular/core';
import {MOCK_ROOMS} from '@company/shared/constants/mock-rooms.constant';
import { IRoom } from '@company/shared/models/room.interface';
import {RoomComponent} from '@company/core/home-view/components/room/room.component';


@Component({
  selector: 'app-rooms',
  imports: [
    RoomComponent
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  rooms: IRoom[] = MOCK_ROOMS;
  selectedRoom: IRoom | null = null;


}
