import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface UserResponse {
  id: number;
  username: string;
  password: string;
}


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
    private http: HttpClient, 
    private router:Router,
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
    const userData = {
      username: formData.email, 
      password: formData.password
    };

    this.http.post<UserResponse>('http://52.55.154.142:8081/users', userData).subscribe({
      next: (response) => {
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
  
    this.http.get<any>(`http://52.55.154.142:8081/users/search?username=${username}`).subscribe({
      next: (response) => {
        console.log(response); 
  
        if (response && response.password === formData.password) {
  
          const currentUserCookie = this.getCookie('userId');
  
          if (!currentUserCookie || currentUserCookie !== username) {
            this.cookieService.set('userId', username, { path: '/', expires: new Date(new Date().getTime() + 3600 * 1000) });
  
            this.http.get<any>(`http://44.197.200.249:8080/api/cards/${username}`).subscribe({
              next: (cardResponse) => {
                if (cardResponse) {
                  this.cookieService.set('cardNumber', cardResponse.cardNumber, { path: '/', expires: new Date(new Date().getTime() + 3600 * 1000) });
                }
              },
              error: (error) => {
                console.error('No se encontró tarjeta para este usuario', error);
              }
            });
          }
  
          this.router.navigate(['/profile']);
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

