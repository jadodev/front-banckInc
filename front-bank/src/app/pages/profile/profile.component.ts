import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VirtualCardComponent } from '../../components/virtual-card/virtual-card.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { CookieService } from 'ngx-cookie-service';
import { CardService } from '../../services/card.service';

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

  constructor(
    private cardService:CardService,
    private router: Router, 
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.cardNumber = this.cookieService.get('cardNumber');

    if (this.cardNumber) {
      this.cardService.getCardByNumber(this.cardNumber).subscribe({
        next: (response) => {
          this.cardInfo = response;
        },
        error: (error) => {
          console.error('Error al obtener la tarjeta:', error);
          alert('No se pudo obtener la información de la tarjeta.');
          this.router.navigate(['/create-card']);
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
