import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'card-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardFormComponent {
  cardForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
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

    console.log("antes del if")
    const cardNumber = this.cookieService.get('cardNumber');
    console.log(cardNumber);

    if (cardNumber) {
      this.router.navigate(['/profile']);
    } else {
      this.isLoading = true;
      this.cardService.createCard(formData).subscribe({
        next: (response) => {
          console.log(formData)
          if (response) {
            this.cookieService.set('cardNumber', response.cardNumber);
            this.cookieService.set('userId', userId);
            this.cardForm.reset();
            this.router.navigate(['/profile']);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al crear la tarjeta:', error);
          alert('Error al crear la tarjeta');
          this.isLoading = false;
        }
      });
    }
  }
}
