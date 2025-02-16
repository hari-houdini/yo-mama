import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageComponent } from './stage/stage.component';

@Component({
  selector: 'arena',
  imports: [CommonModule, StageComponent],
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss',
})
export class ArenaComponent {
  value = input('', { transform: trimString });
}

function trimString(value?: string): string {
  return value?.trim() ?? '';
}
