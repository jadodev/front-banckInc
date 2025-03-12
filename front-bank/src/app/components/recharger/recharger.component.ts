import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-recharger',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recharger.component.html',
  styleUrl: './recharger.component.css'
})
export class RechargerComponent {
  rechargeForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.rechargeForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log("se ejecuto");
    console.log(this.rechargeForm.valid);
    console.log('holderName valid:', this.rechargeForm.get('holderName')?.valid);
    console.log('cardNumber valid:', this.rechargeForm.get('cardNumber')?.valid);
    console.log('amount valid:', this.rechargeForm.get('amount')?.valid);

    if (this.rechargeForm.valid) {
      const rechargeData = {
        amount: this.rechargeForm.value.amount
      };
      
      this.isLoading = true;
      this.http.post(`http://localhost:8080/api/cards/${this.rechargeForm.value.cardNumber}/recharge`, rechargeData)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.successMessage = 'Recarga realizada con éxito';
            this.errorMessage = '';
            this.rechargeForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'Recarga cancelada. Intenta nuevamente.';
            this.successMessage = '';
          }
        });
    }
  }
}
