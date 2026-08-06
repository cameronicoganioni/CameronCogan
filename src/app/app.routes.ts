import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  // Redirect root to default language
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full'
  },

  // Language routes – all load the same page
  {
    path: 'en',
    component: HomeComponent
  },
  {
    path: 'fr',
    component: HomeComponent
  },
  {
    path: 'de',
    component: HomeComponent
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'en'
  }
];