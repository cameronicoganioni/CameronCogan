import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  // Signal managing mobile open/close states
  isMenuOpen = signal(false);

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
}