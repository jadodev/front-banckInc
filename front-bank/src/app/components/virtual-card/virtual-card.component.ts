import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'credit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
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
