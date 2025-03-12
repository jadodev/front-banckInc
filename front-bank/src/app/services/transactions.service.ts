import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {
  private apiUrl = 'http://3.93.217.90:8080/api/cards';

  constructor(private http: HttpClient) {}

  rechargeCard(cardNumber: string, amount: number): Observable<any> {
    const url = `${this.apiUrl}/${cardNumber}/recharge`;
    const rechargeData = { amount };
    return this.http.post(url, rechargeData);
  }
}


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://54.175.175.233:8085/api/transactions/card';

  constructor(private http: HttpClient) {}

  getTransactions(cardNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${cardNumber}`);
  }
}


@Injectable({
  providedIn: 'root'
})
export class CancelTransaction {
  private apiUrl = 'http://54.175.175.233:8085/api/transactions/cancel';

  constructor(private http: HttpClient) {}

  cancelTransaction(transactionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${transactionId}`, {});
  }
}
