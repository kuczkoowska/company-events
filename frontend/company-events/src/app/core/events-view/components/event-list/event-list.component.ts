import {Component, inject, ResourceLoaderParams, ResourceRef} from '@angular/core';
import {IEvent} from '@company/shared/models/event.interface';
import {CommonModule} from '@angular/common';
import {EventsService} from '@company/core/services/events.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {SharedEventListComponent} from '@company/shared/components/shared-event-list/shared-event-list.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  imports: [CommonModule, SharedEventListComponent],
  standalone: true
})
export class EventListComponent {
  private eventsService: EventsService = inject(EventsService);

  public upcomingEventsResource: ResourceRef<IEvent[]> = rxResource({
    loader: () => this.eventsService.getUpcomingEvents()
  })

  public searchEventsByTagsResource: ResourceRef<IEvent[]> = rxResource({
    loader: (params: ResourceLoaderParams<unknown>) => this.eventsService.searchEventsByTags(params as unknown as string)
  })

  onDetails(): void {

  }
}
