import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CardFormComponent } from './pages/card/card.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'create-card', component: CardFormComponent }
];
