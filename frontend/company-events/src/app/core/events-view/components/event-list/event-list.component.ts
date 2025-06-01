import {Component, ResourceRef, inject, ResourceLoaderParams} from '@angular/core';
import { IEvent } from '@company/shared/models/event.interface';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from '@company/core/events-view/components/event-details/event-details.component';
import { EventsService } from '@company/core/services/events.service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  imports: [CommonModule, EventDetailsComponent],
  standalone: true
})
export class EventListComponent {
  events: IEvent[] = [];
  private eventsService: EventsService = inject(EventsService);

  public eventsResource: ResourceRef<IEvent[]> = rxResource({
    loader: () => this.eventsService.getAllEvents()
  })

  public searchEventsByTagsResource: ResourceRef<IEvent[]> = rxResource({
    loader: (params: ResourceLoaderParams<unknown>) => this.eventsService.searchEventsByTags(params as unknown as string)
  })
  onDetails(): void {

  }
}
