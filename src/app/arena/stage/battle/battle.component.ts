import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattleService } from '../../../services/battle.service';
import { type BattleLog } from '../../../app.types';

@Component({
  selector: 'battle',
  imports: [CommonModule],
  templateUrl: './battle.component.html',
  styleUrl: './battle.module.css',
})
export class BattleComponent {
  @Input()
  roast: BattleLog;

  @Input()
  round: number;

  constructor(private battleService: BattleService) {
    this.roast = {} as BattleLog;
    this.round = 1;
  }
}
