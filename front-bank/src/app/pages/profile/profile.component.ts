import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VirtualCardComponent } from '../../components/virtual-card/virtual-card.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, VirtualCardComponent, CardActionsComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cardNumber: string | null = null;
  cardInfo: any = null; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cardNumber = this.getCookie('cardNumber');
    console.log(this.cardNumber)

    if (this.cardNumber) {
      this.http.get<any>(`http://44.197.200.249:8080/api/cards/${this.cardNumber}`).subscribe({
        next: (response) => {
          this.cardInfo = response;
        },
        error: (error) => {
          console.error('Error al obtener los detalles de la tarjeta:', error);
          alert('No se pudo obtener la información de la tarjeta');
        }
      });
    } else {
      alert('No se encontró un número de tarjeta.');
      this.router.navigate(['/create-card']);
    }
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
  }
}
