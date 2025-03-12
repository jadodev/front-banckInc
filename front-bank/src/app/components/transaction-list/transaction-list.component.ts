import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.cardNumber) {
      this.fetchTransactions();
    } else {
      this.error = 'Número de tarjeta no disponible.';
      this.isLoading = false;
    }
  }

  fetchTransactions(): void {
    this.http.get<any[]>(`http://107.21.77.240:8085/api/transactions/card/${this.cardNumber}`).subscribe({
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
