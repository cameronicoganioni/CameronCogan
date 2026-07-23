import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  // Signal managing mobile open/close states
  isMenuOpen = signal(false);

  // Language
  currentLang: 'en' | 'fr' | 'de' = 'en';

  translations = {
    en: {
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      cookies: 'Cookies',
      studentTitle: 'Student in International Business Administration'
    },
    fr: {
      about: 'À propos',
      projects: 'Projets',
      experience: 'Expérience',
      contact: 'Contact',
      cookies: 'Cookies',
      studentTitle: 'Étudiant en Administration des Affaires Internationales'
    },
    de: {
      about: 'Über mich',
      projects: 'Projekte',
      experience: 'Erfahrung',
      contact: 'Kontakt',
      cookies: 'Cookies',
      studentTitle: 'Student der International Business Administration'
    }
  };

  get t() {
    return this.translations[this.currentLang];
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('preferredLang') as 'en' | 'fr' | 'de';
    if (savedLang) {
      this.currentLang = savedLang;
    }
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  // Google Analytics event tracking
  trackEvent(category: string, action: string, label: string = '') {
    if (localStorage.getItem('analyticsCookies') === 'true' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }

  // Language switcher
  setLanguage(lang: 'en' | 'fr' | 'de') {
    this.currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    // Reload so the Home component picks up the new language
    window.location.reload();
  }

  openCookiePolicy() {
  // Direct method - more reliable on mobile
  const homeComponent = (window as any).homeComponentInstance;
  if (homeComponent) {
    homeComponent.showCookiePolicy = true;
  } else {
    // fallback
    window.dispatchEvent(new CustomEvent('open-cookie-policy'));
  }
  this.trackEvent('navigation', 'section_click', 'Cookies');
}
}