import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-view',
  imports: [],
  template: './admin-view.component.html',
  styleUrl: './admin-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminViewComponent { }
