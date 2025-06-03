import {ChangeDetectionStrategy, Component, output, OutputEmitterRef} from '@angular/core';
import {SharedButtonComponent} from '@company/shared/components/shared-button/shared-button.component';

@Component({
  selector: 'app-event-filters',
  imports: [
    SharedButtonComponent
  ],
  templateUrl: './event-filters.component.html',
  styleUrl: './event-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFiltersComponent {
  public onFilterChange: OutputEmitterRef<'upcoming' | 'past' | 'ongoing' | 'all'> = output()

  public filterChangeHandler(filter: 'upcoming' | 'past' | 'ongoing' | 'all'): void {
    this.onFilterChange.emit(filter);
  }
}
