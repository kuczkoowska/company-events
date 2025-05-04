import { Component } from '@angular/core';
import { MOCK_EVENTS } from '@company/shared/constants/mock-events.constant';
import { IEvent } from '@company/shared/models/event.interface';
import { CommonModule } from '@angular/common';
import {EventDetailsComponent} from '@company/core/events-view/components/event-details/event-details.component';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
  imports: [CommonModule, EventDetailsComponent],
})
export class EventListComponent {
    events: IEvent[] = MOCK_EVENTS;

    onDetails(): void {

    }
}
