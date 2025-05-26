import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-view',
  imports: [],
  templateUrl: './about-view.component.html',
  styleUrl: './about-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutViewComponent { }
