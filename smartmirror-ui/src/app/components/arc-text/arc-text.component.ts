import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arc-text',
  templateUrl: './arc-text.component.html',
  styleUrls: ['./arc-text.component.css']
})
export class ArcTextComponent {
  @Input() text: string = '';
  @Input() direction: number = 1;
  @Input() arc: number = 1;
  @Input() radius: number = 800;
  @Input() arcDegrees: number = 60; // Total angle to span

  getTransform(index: number, total: number): string {
    if (total <= 1) return 'rotate(0deg)';

    const arc = this.arcDegrees;
    const startAngle = arc / 2; // Flip arc direction
    const anglePerChar = arc / (total - 1);
    const angle = startAngle - index * anglePerChar; // Reversed direction

    // Rotate into place, then un-rotate text upright
    return `rotate(${angle}deg) translateY(${-this.radius}px) rotate(${angle}deg)`;
  }

}
