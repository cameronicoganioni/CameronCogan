import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  // Redirect root to default language
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full'
  },

  // Language only – e.g. /en, /fr, /de
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

  // Language + section – e.g. /en/about, /fr/projects (no hashtag)
  {
    path: 'en/:section',
    component: HomeComponent
  },
  {
    path: 'fr/:section',
    component: HomeComponent
  },
  {
    path: 'de/:section',
    component: HomeComponent
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'en'
  }
];