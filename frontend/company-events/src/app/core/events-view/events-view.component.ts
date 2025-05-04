import { Component } from '@angular/core';
import { EventListComponent } from './components/event-list/event-list.component';

@Component({
  selector: 'app-events-view',
  imports: [EventListComponent],
  templateUrl: './events-view.component.html',
  styleUrl: './events-view.component.scss'
})
export class EventsViewComponent {

}
