import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ResourceRef,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {EventsService} from '@company/shared/services/events.service';
import {IEvent} from '@company/shared/models/event.interface';
import {rxResource} from '@angular/core/rxjs-interop';
import {RoomsService} from '@company/shared/services/rooms.service';
import {IRoom} from '@company/shared/models/room.interface';
import {FormsModule} from '@angular/forms';
import {SharedButtonComponent} from '@company/shared/components/shared-button/shared-button.component';
import {EventFiltersComponent} from '@company/core/admin-view/components/event-filters/event-filters.component';
import {RoomListComponent} from '@company/core/admin-view/components/room-list/room-list.component';
import {RoomFormComponent} from '@company/core/admin-view/components/room-form/room-form.component';
import {EventFormComponent} from '@company/core/admin-view/components/event-form/event-form.component';
import {createEvent} from '@company/shared/models/createEvent';
import {FeedbackComponent} from '@company/core/admin-view/components/feedback/feedback.component';
import {FeedbackService} from '@company/shared/services/feedback.service';
import {IFeedback} from '@company/shared/models/feedback.interface';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SharedButtonComponent, EventFiltersComponent, RoomListComponent, RoomFormComponent, EventFormComponent, FeedbackComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminViewComponent {
  public activeTab: WritableSignal<'events' | 'rooms' | 'feedback'> = signal('events');
  private eventsService: EventsService = inject(EventsService);
  private roomsService = inject(RoomsService);
  private feedbackService = inject(FeedbackService);
  public showRoomForm: WritableSignal<boolean> = signal(false);
  public showEventForm: WritableSignal<boolean> = signal(false);
  public roomName: string = '';
  public roomCapacity: number | null = null;

  public constructor(private router: Router) {
  }


  public allEventsResource: ResourceRef<IEvent[]> = rxResource({
    loader: () => this.eventsService.getAllEvents()
  })

  public upcomingEventsResource: ResourceRef<IEvent[]> = rxResource({
    loader: () => this.eventsService.getUpcomingEvents()
  })

  public pastEventsResource: ResourceRef<IEvent[]> = rxResource({
    loader: () => this.eventsService.getPastEvents()
  })

  public ongoingEventsResource: ResourceRef<IEvent[]> = rxResource({
    loader: () => this.eventsService.getOnGoingEvents()
  })

  public roomsResource: ResourceRef<IRoom[]> = rxResource({
    loader: () => this.roomsService.getAllRooms()
  });

  public feedbackResource: ResourceRef<IFeedback[]> = rxResource({
    loader: () => this.feedbackService.getAllFeedbacks()
  });

  private readonly filter: WritableSignal<'upcoming' | 'past' | 'ongoing' | 'all'> = signal('all');

  public readonly events: Signal<IEvent[]> = computed(() => {
    switch (this.filter()) {
      case 'upcoming':
        return this.upcomingEventsResource.value();
      case 'past':
        return this.pastEventsResource.value();
      case "ongoing":
        return this.ongoingEventsResource.value();
      case 'all':
        return this.allEventsResource.value();
    }
  })

  public filterEvents(filter: 'upcoming' | 'past' | 'ongoing' | 'all') {
    this.filter.set(filter);
  }


  public createRoom(room: Partial<IRoom>) {
    this.roomsService.createRoom(room).subscribe(() => this.roomsResource.reload())
  }

  navigateToAbout(): void {
    this.router.navigate(['/about']);
  }

  public createEvent(formData: Omit<IEvent, 'id' | 'organizer' | 'participants' | 'location'> & { roomId: string }) {
    console.log(formData);
    const eventData: createEvent = {
      name: formData.name,
      date: formData.date,
      eventStart: formData.eventStart,
      eventEnd: formData.eventEnd,
      location: formData.roomId,
      description: formData.description,
      tags: formData.tags,
      maxParticipants: formData.maxParticipants
    };

    this.eventsService.createEvent(eventData).subscribe(() => this.allEventsResource.reload());
  }

}
