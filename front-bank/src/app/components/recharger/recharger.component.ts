import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RechargeService } from '../../services/transactions.service';

@Component({
  standalone: true,
  selector: 'app-recharger',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recharger.component.html',
  styleUrls: ['./recharger.component.css']
})
export class RechargerComponent {
  rechargeForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private rechargeService: RechargeService) {
    this.rechargeForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.rechargeForm.valid) {
      this.isLoading = true;
      const cardNumber = this.rechargeForm.value.cardNumber;
      const amount = parseFloat(this.rechargeForm.value.amount);

      this.rechargeService.rechargeCard(cardNumber, amount).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Recarga realizada con éxito';
          this.errorMessage = '';
          this.rechargeForm.reset();
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Recarga cancelada. Intenta nuevamente.';
          this.successMessage = '';
        }
      });
    }
  }
}
