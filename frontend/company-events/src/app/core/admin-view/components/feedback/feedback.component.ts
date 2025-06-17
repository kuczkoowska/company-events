import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {IFeedback} from '@company/shared/models/feedback.interface';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent {
  public feedbacks: InputSignal<IFeedback[]> = input();
}
