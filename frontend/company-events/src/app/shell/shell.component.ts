import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './shell.component.html',
  standalone: true,
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent { }
