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
}