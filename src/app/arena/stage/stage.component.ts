import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoastComponent } from './roast/roast.component';

@Component({
  selector: 'stage',
  imports: [CommonModule, RoastComponent],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss',
})
export class StageComponent {
  value = input('', { transform: trimString });
}

function trimString(value?: string): string {
  return value?.trim() ?? '';
}
