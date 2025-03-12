import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TransactionService } from '../../services/transactions.service';

@Component({
  selector: 'transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  @Input() cardNumber: string = '';
  transactions: any[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    if (this.cardNumber) {
      this.fetchTransactions();
    } else {
      this.error = 'Número de tarjeta no disponible.';
      this.isLoading = false;
    }
  }

  fetchTransactions(): void {
    this.transactionService.getTransactions(this.cardNumber).subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener las transacciones', err);
        this.isLoading = false;
        this.error = 'No se pudieron obtener las transacciones. Intenta nuevamente más tarde.';
      }
    });
  }
}
