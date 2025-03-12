import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { CardFormComponent } from './pages/card/card.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'create-card', component: CardFormComponent },
    { path: 'profile', component: ProfileComponent },
];
