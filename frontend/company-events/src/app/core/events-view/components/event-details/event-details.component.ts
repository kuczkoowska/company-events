import {ChangeDetectionStrategy, Component, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {IEvent} from '@company/shared/models/event.interface';

@Component({
  selector: 'app-event-details',
  imports: [],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {
  event: InputSignal<IEvent> = input();
  public visible: WritableSignal<boolean> = signal(false);

  public open(): void {
    this.visible.set(true);
  }

  public close(): void {
    this.visible.set(false);
  }
}
