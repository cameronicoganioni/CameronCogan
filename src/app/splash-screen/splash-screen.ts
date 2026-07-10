import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.html'
})
export class SplashScreenComponent implements OnInit {
  isVisible = signal(true);

  ngOnInit() {
    // Keeps the cinematic title up for 3 seconds before executing the escape flight
    setTimeout(() => {
      this.isVisible.set(false);
    }, 3000);
  }
}