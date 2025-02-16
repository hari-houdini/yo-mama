import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'roast',
  imports: [CommonModule],
  templateUrl: './roast.component.html',
  styleUrl: './roast.component.scss',
})
export class RoastComponent {
  value = input('', { transform: trimString });
}

function trimString(value?: string): string {
  return value?.trim() ?? '';
}
