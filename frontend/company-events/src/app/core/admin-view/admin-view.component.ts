import {Component, ResourceRef, inject, runInInjectionContext, Injector} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {EventsService} from '@company/core/services/events.service';
import {IEvent} from '@company/shared/models/event.interface';
import {rxResource} from '@angular/core/rxjs-interop';
import {RoomsService} from '@company/core/services/rooms.service';
import {IRoom} from '@company/shared/models/room.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AdminViewComponent {
    activeTab: string = 'events';
    private eventsService: EventsService = inject(EventsService);
    private roomsService = inject(RoomsService);
    private injector = inject(Injector);
    public filteredEvents: IEvent[] = [];
    public rooms: IRoom[] = [];

  public eventsResource: ResourceRef<IEvent[]> = rxResource({
    loader: () => this.eventsService.getAllEvents()
  })

  public filterEvents(filter: string) {
    runInInjectionContext(this.injector, () => {
      switch (filter) {
        case 'upcoming':
          this.eventsResource = rxResource({
            loader: () => this.eventsService.getUpcomingEvents()
          });
          break;
        case 'past':
          this.eventsResource = rxResource({
            loader: () => this.eventsService.getPastEvents()
          });
          break;
        case 'ongoing':
          this.eventsResource = rxResource({
            loader: () => this.eventsService.getOnGoingEvents()
          });
          break;
      }
    });
  }

  public roomsResource: ResourceRef<IRoom[]> = rxResource({
    loader: () => this.roomsService.getAllRooms()
  });

  public createRoom(room: Partial<IRoom>) {
    runInInjectionContext(this.injector, () => {
      this.roomsService.createRoom(room).subscribe(() => {
        this.roomsResource = rxResource({
          loader: () => this.roomsService.getAllRooms()
        });
      });
    });
  }

  public showRoomForm: boolean = false;
  public roomName: string = '';
  public roomCapacity: number | null = null;
}
