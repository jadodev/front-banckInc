import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
];
