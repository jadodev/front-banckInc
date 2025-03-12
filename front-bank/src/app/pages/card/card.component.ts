import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface CardResponse {
  cardNumber: string;
  titularName: string;
  expirationDate: string;
  cardType: string;
  balance: number;
}

@Component({
  selector: 'card-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
  export class CardFormComponent {
    cardForm: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router, 
      private cookieService: CookieService
    ) {
      this.cardForm = this.fb.group({
        productId: ['', [Validators.required, Validators.minLength(6)]], 
        titularName: ['', Validators.required],
        cardType: ['CREDITO', Validators.required]
      });
    }
  
    onSubmit() {

      if (this.cardForm.invalid) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
      }
  
      const formData = this.cardForm.value;

      const userId = this.cookieService.get('userId');

      if (!userId) {
        alert('No se encontró un usuario registrado. Por favor, regístrate primero.');
        return;
      }

      const cardNumber = this.cookieService.get('cardNumber');
      if (cardNumber) {
        this.router.navigate(['/profile']);
      } else {
        this.http.post<CardResponse>('http://44.197.200.249:8080/api/cards', formData).subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('cardNumber', response.cardNumber); 
              this.cookieService.set('userId', userId);
              this.cardForm.reset();
              this.router.navigate(['/profile']);
            }
          },
          error: (error) => {
            console.error('Error al crear la tarjeta:', error);
            alert('Error al crear la tarjeta');
          }
        });
      }
    }
  }
