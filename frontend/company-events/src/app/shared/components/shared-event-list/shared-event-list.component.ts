import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {EventDetailsComponent} from "@company/core/events-view/components/event-details/event-details.component";
import {IEvent} from '@company/shared/models/event.interface';
import {DatePipe} from '@angular/common';
import {TimeRangePipe} from '@company/shared/pipes/time-range.pipe';

@Component({
  selector: 'app-shared-event-list',
  imports: [
    EventDetailsComponent,
    DatePipe,
    TimeRangePipe
  ],
  templateUrl: './shared-event-list.component.html',
  styleUrl: './shared-event-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedEventListComponent {
  public events: InputSignal<IEvent[]> = input.required()
}
