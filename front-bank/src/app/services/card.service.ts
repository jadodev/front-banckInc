import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CardResponse {
  cardNumber: string;
  titularName: string;
  expirationDate: string;
  cardType: string;
  balance: number;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://3.93.217.90:8080/api/cards';

  constructor(private http: HttpClient) {}

  createCard(cardData: any): Observable<CardResponse> {
    return this.http.post<CardResponse>(this.apiUrl, cardData);
  }

  getCardByUserId(userId: number): Observable<CardResponse> {
    return this.http.get<CardResponse>(`${this.apiUrl}/${userId}`);
  }

  getCardByNumber(cardNumber: string): Observable<CardResponse> {
    return this.http.get<CardResponse>(`${this.apiUrl}/${cardNumber}`);
  }
}
