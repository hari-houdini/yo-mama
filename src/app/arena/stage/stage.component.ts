import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattleService } from '../../services/battle.service';
import { type BattleLog } from '../../app.types';
import { BattleComponent } from './battle/battle.component';

@Component({
  selector: 'stage',
  imports: [BattleComponent, CommonModule],
  templateUrl: './stage.component.html',
  styleUrl: './stage.module.css',
})
export class StageComponent {
  @Input()
  roasts: BattleLog[];

  constructor(private battleService: BattleService) {
    this.roasts = [
      {
        results: 'Draw',
        message: {
          ai: 'Yo mama is a yo mama',
          human: 'Yo mama is a yo mama',
        },
        score: {
          ai: 8,
          human: 8,
        },
      },
      {
        results: 'Draw',
        message: {
          ai: 'Yo mama is a yo mama',
          human: 'Yo mama is a yo mama',
        },
        score: {
          ai: 8,
          human: 8,
        },
      },
    ];
  }
}
