import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ArenaComponent } from './arena/arena.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArenaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.module.css',
})
export class AppComponent {
  title = 'yo-mama';
}
