import { Component, Input } from '@angular/core';
import { RechargerComponent } from '../recharger/recharger.component';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';

@Component({
  selector: 'card-actions',
  standalone: true,
  imports: [CommonModule, RechargerComponent, TransactionListComponent],
  templateUrl: './card-actions.component.html',
  styleUrl: './card-actions.component.css'
})
export class CardActionsComponent {
  @Input() cardNumber: string | null = null;

  showRechargeForm = false;
  showTransactions = false;

  onReload() {
    this.showTransactions = false;
    this.showRechargeForm = !this.showRechargeForm;
  }

  onViewTransactions() {
    this.showRechargeForm = false;
    this.showTransactions = !this.showTransactions;
  }

  onCancelTransaction() {
    console.log('Anular transacción');
  }
}
