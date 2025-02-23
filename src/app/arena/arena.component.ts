import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattleService } from '../services/battle.service';
import { FormsModule } from '@angular/forms';
import { RocketSVGComponent } from '../rocket/rocket.component';
import type { BattleLog } from '../app.types';
import { StageComponent } from './stage/stage.component';

@Component({
  selector: 'arena',
  imports: [StageComponent, RocketSVGComponent, CommonModule, FormsModule],
  templateUrl: './arena.component.html',
  styleUrl: './arena.module.css',
  standalone: true,
})
export class ArenaComponent {
  roast: string;
  logs: BattleLog[];
  battleService: BattleService = inject(BattleService);

  constructor() {
    this.roast = '';
    this.logs = this.battleService.getBattleLogs();
  }

  async dunzo(event?: Event) {
    await this.battleService.addResponse(this.roast);
  }
}
