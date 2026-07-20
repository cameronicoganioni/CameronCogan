import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashScreenComponent, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Cameronsite');

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const lang = (localStorage.getItem('preferredLang') as 'en' | 'fr' | 'de') || 'en';
      this.updateSeoForLanguage(lang);
    }
  }

  private updateSeoForLanguage(lang: 'en' | 'fr' | 'de') {
    // Update <html lang="...">
    this.document.documentElement.lang = lang;

    const seo = this.getSeoContent(lang);

    // Update title
    this.titleService.setTitle(seo.title);

    // Update meta description
    this.metaService.updateTag({ name: 'description', content: seo.description });

    // Update Open Graph tags
    this.metaService.updateTag({ property: 'og:title', content: seo.title });
    this.metaService.updateTag({ property: 'og:description', content: seo.description });
    this.metaService.updateTag({ property: 'og:locale', content: seo.locale });
  }

  private getSeoContent(lang: 'en' | 'fr' | 'de') {
    const content = {
      en: {
        title: 'Cameron Cogan | Digital Marketing, SEO & Business Portfolio',
        description: 'Cameron Cogan – International Business Administration student at Montpellier Business School. Specialising in digital marketing, SEO, analytics, AI and automation.',
        locale: 'en_GB'
      },
      fr: {
        title: 'Cameron Cogan | Portfolio Marketing Digital, SEO & Business',
        description: 'Cameron Cogan – Étudiant en Administration des Affaires Internationales à Montpellier Business School. Spécialisé en marketing digital, SEO, analytics, IA et automatisation.',
        locale: 'fr_FR'
      },
      de: {
        title: 'Cameron Cogan | Digital Marketing, SEO & Business Portfolio',
        description: 'Cameron Cogan – Student der International Business Administration an der Montpellier Business School. Spezialisiert auf digitales Marketing, SEO, Analytics, KI und Automatisierung.',
        locale: 'de_DE'
      }
    };

    return content[lang];
  }
}