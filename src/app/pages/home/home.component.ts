import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.checkCookieConsent();
  }

  private checkCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
      const banner = document.getElementById('cookie-banner');
      if (banner) banner.classList.remove('hidden');
    }
  }

  acceptAllCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.hideBanner();
  }

  rejectNonEssential() {
    localStorage.setItem('cookieConsent', 'rejected-non-essential');
    this.hideBanner();
  }

  private hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('hidden');
    }
  }
}