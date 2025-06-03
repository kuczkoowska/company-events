import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  imports: [],
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedButtonComponent {

}
