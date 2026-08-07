import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
      studentTitle: 'Student in International Business Administration',
      servicesLabel: 'Services'
    },
    fr: {
      about: 'À propos',
      projects: 'Projets',
      experience: 'Expérience',
      contact: 'Contact',
      cookies: 'Cookies',
      studentTitle: 'Étudiant en Administration des Affaires Internationales',
      servicesLabel: 'Services'
    },
    de: {
      about: 'Über mich',
      projects: 'Projekte',
      experience: 'Erfahrung',
      contact: 'Kontakt',
      cookies: 'Cookies',
      studentTitle: 'Student der International Business Administration',
      servicesLabel: 'Dienstleistungen'
    }
  };

  get t() {
    return this.translations[this.currentLang];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.syncLanguageFromUrl();

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.syncLanguageFromUrl());
  }

  private syncLanguageFromUrl() {
    const lang = this.getLangFromUrl();
    if (lang !== this.currentLang) {
      this.currentLang = lang;
      localStorage.setItem('preferredLang', lang);
    }
  }

  private getLangFromUrl(): 'en' | 'fr' | 'de' {
    const segment = this.router.url.split('?')[0].split('/').filter(Boolean)[0];
    if (segment === 'en' || segment === 'fr' || segment === 'de') {
      return segment;
    }
    return 'en';
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

  // Language switcher – keep current section when switching language
  setLanguage(lang: 'en' | 'fr' | 'de') {
    if (this.currentLang === lang) return;

    this.currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    this.trackEvent('engagement', 'language_select', lang);

    const section = this.router.url.split('?')[0].split('/').filter(Boolean)[1];
    const valid = ['about', 'projects', 'experience', 'services', 'contact'];
    if (section && valid.includes(section)) {
      this.router.navigate(['/', lang, section]);
    } else {
      this.router.navigate(['/', lang]);
    }
  }

  // Open Cookie Policy modal
  openCookiePolicy() {
    window.dispatchEvent(new CustomEvent('open-cookie-policy'));
  }
}