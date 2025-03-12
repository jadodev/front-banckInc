import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm: FormGroup;
  isRegister = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cardService: CardService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  toggleMode() {
    this.isRegister = !this.isRegister;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    const formData = this.authForm.value;

    if (this.isRegister) {
      this.registerUser(formData);
    } else {
      this.loginUser(formData);
    }
  }

  registerUser(formData: any) {
    const userData = { username: formData.email, password: formData.password };

    this.authService.registerUser(userData).subscribe({
      next: () => {
        this.isRegister = false;
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Hubo un problema en el registro');
      }
    });
  }

  loginUser(formData: any) {
    const username = formData.email;
  
    this.authService.loginUser(username).subscribe({
      next: (response) => {
        if (response && response.password === formData.password) {
          let userId = this.getCookie('userId');
  
          if (!userId) {
            userId = (Math.floor(Math.random() * 900000) + 100000).toString();
            this.cookieService.set('userId', userId, { path: '/', expires: new Date(new Date().getTime() + 3600 * 1000) });
          }
  
          const storedCardNumber = this.getCookie('cardNumber');
  
          if (!storedCardNumber) {
            this.router.navigate(['/create-card']);
          } else {
            this.router.navigate(['/profile']);
          }
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Usuario no encontrado o error en el servidor');
      }
    });
  }
  
}
