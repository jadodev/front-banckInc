import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CancelTransaction } from '../../services/transactions.service';

@Component({
  selector: 'app-cancel-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel-transaction.component.html',
  styleUrl: './cancel-transaction.component.css'
})
export class CancelTransactionComponent {
  transactionId: string = '';
  message: string = '';
  isLoading: boolean = false;

  constructor(private transactionService: CancelTransaction) {}

  cancelTransaction(): void {
    if (!this.transactionId) {
      this.message = 'Ingrese un ID de transacción válido.';
      return;
    }

    this.isLoading = true;
    this.transactionService.cancelTransaction(this.transactionId).subscribe({
      next: () => {
        this.message = 'Transacción anulada con éxito.';
        this.isLoading = false;
        this.transactionId = '';
      },
      error: () => {
        this.message = 'Error al anular la transacción. Intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }
}
