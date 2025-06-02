import {Component, ResourceRef, inject, runInInjectionContext, Injector} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {EventsService} from '@company/core/services/events.service';
import {IEvent} from '@company/shared/models/event.interface';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AdminViewComponent {
    activeTab: string = 'events';
    private eventsService: EventsService = inject(EventsService);
    private injector = inject(Injector);
    filteredEvents: IEvent[] = [];

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

}
