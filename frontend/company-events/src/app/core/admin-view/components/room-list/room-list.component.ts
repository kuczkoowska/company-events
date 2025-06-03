import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {IRoom} from '@company/shared/models/room.interface';

@Component({
  selector: 'app-room-list',
  imports: [],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomListComponent {
  public rooms: InputSignal<IRoom[]> = input.required()
}
