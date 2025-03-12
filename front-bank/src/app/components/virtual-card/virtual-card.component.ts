import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'virtual-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.css']
})
export class VirtualCardComponent {
  @Input() cardNumber!: string;
  @Input() titularName!: string;
  @Input() expirationDate!: string;
  @Input() cardType!: string;
  @Input() balance!: number;

  formatCardNumber(cardNumber: string): string {
    return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
  }
}
