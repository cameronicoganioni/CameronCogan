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

  acceptAll() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.hideBanner();
  }

  rejectNonEssential() {
    localStorage.setItem('cookieConsent', 'rejected-non-essential');
    this.hideBanner();
  }

  managePreferences() {
    const choice = confirm(
      "Cookie Preferences\n\n" +
      "• Essential Cookies: Always required\n" +
      "• Analytics Cookies: Not currently used\n\n" +
      "Would you like to accept all cookies?"
    );

    if (choice) {
      this.acceptAll();
    } else {
      this.rejectNonEssential();
    }
  }

  // This is the function you need for the Cookie Policy page
  openCookieSettings() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('hidden');
      localStorage.removeItem('cookieConsent'); // Allows user to choose again
    }
  }

  private hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('hidden');
    }
  }
}