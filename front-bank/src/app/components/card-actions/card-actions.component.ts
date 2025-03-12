import { Component, Input } from '@angular/core';
import { RechargerComponent } from '../recharger/recharger.component';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { CancelTransactionComponent } from '../cancel-transaction/cancel-transaction.component';

@Component({
  selector: 'card-actions',
  standalone: true,
  imports: [CommonModule, RechargerComponent, TransactionListComponent, CancelTransactionComponent],
  templateUrl: './card-actions.component.html',
  styleUrl: './card-actions.component.css'
})
export class CardActionsComponent {
  @Input() cardNumber: string | null = null;

  showRechargeForm = false;
  showTransactions = false;
  cancelTransactions: boolean = false;

  onReload() {
    this.showTransactions = false;
    this.cancelTransactions = false; 
    this.showRechargeForm = !this.showRechargeForm;
  }

  onViewTransactions() {
    this.showRechargeForm = false;
    this.cancelTransactions = false;
    this.showTransactions = !this.showTransactions;
  }

  onCancelTransaction(): void {
    this.cancelTransactions = !this.cancelTransactions;
    this.showRechargeForm = false;
    this.showTransactions = false;
  }
}
