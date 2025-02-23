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
  roast = {} as BattleLog;

  @Input()
  round: number = 1;

  constructor(private battleService: BattleService) {}
}
