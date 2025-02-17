import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattleService } from '../services/battle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'arena',
  imports: [CommonModule, FormsModule],
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss',
  standalone: true,
})
export class ArenaComponent {
  roast: string;
  battleService: BattleService = inject(BattleService);

  constructor() {
    this.roast = '';
  }

  dunzo(event?: Event) {
    this.battleService.addResponse(this.roast);
    console.log('The value is', this.roast);
  }
}
