import { Component, AfterViewInit, ViewChild, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  showGame = false;
  gameStarted = false;
  level = 1;
  score = 0;
  gameOver = false;

  // Mobile controls
  mobileLeft = false;
  mobileRight = false;
  mobileJump = false;

  // Cookie Preferences
  showPreferences = false;
  analyticsEnabled = false;

  private levelStartScore = 0;
  private facingRight = true;

  private ctx!: CanvasRenderingContext2D;
  private player = { x: 50, y: 280, width: 40, height: 48, vx: 0, vy: 0, jumping: false };
  private keys: { [key: string]: boolean } = {};
  private animationId: number | null = null;

  private playerImage = new Image();
  private backgroundImage = new Image();

  private platforms: { x: number; y: number; width: number; height: number }[] = [];
  private chocolates: { x: number; y: number; collected: boolean }[] = [];
  private spikes: { x: number; y: number; width: number; tall: boolean }[] = [];

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.checkCookieConsent();
  }

  // ==================== COOKIE + GOOGLE ANALYTICS ====================

private checkCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  const analytics = localStorage.getItem('analyticsCookies');

  if (!consent) {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('hidden');
  } else if (analytics === 'true') {
    this.loadGoogleAnalytics();
  }
}

acceptAll() {
  localStorage.setItem('cookieConsent', 'accepted');
  localStorage.setItem('analyticsCookies', 'true');
  this.hideBanner();
  this.loadGoogleAnalytics();
}

rejectNonEssential() {
  localStorage.setItem('cookieConsent', 'rejected-non-essential');
  localStorage.setItem('analyticsCookies', 'false');
  this.hideBanner();
}

managePreferences() {
  this.analyticsEnabled = localStorage.getItem('analyticsCookies') === 'true';
  this.showPreferences = true;
}

savePreferences() {
  localStorage.setItem('cookieConsent', 'custom');
  localStorage.setItem('analyticsCookies', this.analyticsEnabled ? 'true' : 'false');
  this.showPreferences = false;
  this.hideBanner();

  if (this.analyticsEnabled) {
    this.loadGoogleAnalytics();
  }
}

closePreferences() {
  this.showPreferences = false;
}

openCookieSettings() {
  this.managePreferences();
}

private hideBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.add('hidden');
}

// Load Google Analytics only after consent
private loadGoogleAnalytics() {
  // Prevent loading more than once
  if ((window as any).gtagLoaded) return;
  (window as any).gtagLoaded = true;

  console.log('Loading Google Analytics...');

  // 1. Define dataLayer and gtag first
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    w.dataLayer.push(arguments);
  };

  // 2. Initialize
  w.gtag('js', new Date());
  w.gtag('config', 'G-4K67T8TTQ4');

  // 3. Load the actual Google script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4K67T8TTQ4';
  document.head.appendChild(script);
}
  // ==================== EASTER EGG ====================
  toggleEasterEgg() {
    this.showGame = true;
    this.gameStarted = false;
    this.level = 1;
    this.score = 0;
    this.levelStartScore = 0;
    this.gameOver = false;
    setTimeout(() => this.startGame(), 100);
  }

  startPlaying() {
    this.gameStarted = true;
  }

  closeGame() {
    this.showGame = false;
    this.gameStarted = false;
    this.gameOver = false;
    this.mobileLeft = false;
    this.mobileRight = false;
    this.mobileJump = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  retryLevel() {
    this.score = this.levelStartScore;
    this.loadLevel(this.level);
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  private startGame() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d')!;
    this.playerImage.src = './img/panda.webp';
    this.backgroundImage.src = './img/background.webp';

    this.loadLevel(this.level);

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    this.gameLoop();
  }

  private loadLevel(level: number) {
    this.player = { x: 40, y: 250, width: 40, height: 48, vx: 0, vy: 0, jumping: false };
    this.gameOver = false;
    this.levelStartScore = this.score;
    this.facingRight = true;

    this.platforms = [{ x: 0, y: 320, width: 800, height: 80 }];

    const platformCount = Math.min(4 + Math.floor(level * 0.8), 11);
    const heightVariation = 40 + level * 4;

    for (let i = 0; i < platformCount; i++) {
      const baseX = 100 + i * (85 + level * 4);
      const randomOffset = (Math.random() - 0.5) * 40;

      this.platforms.push({
        x: baseX + randomOffset,
        y: 280 - (i % 4) * heightVariation - Math.floor(level / 2) * 8,
        width: Math.max(95 - level * 5, 42),
        height: 16
      });
    }

    // Bamboo
    this.spikes = [];
    const spikeCount = 3 + Math.floor(level * 1.2);

    for (let i = 0; i < spikeCount; i++) {
      const isTall = i === 0 ? false : Math.random() > 0.45;

      this.spikes.push({
        x: 180 + i * (140 - level * 3),
        y: 305,
        width: 28 + Math.random() * 12,
        tall: isTall
      });
    }

    // Chocolates
    this.chocolates = [];
    const chocolateCount = 5 + Math.floor(level / 1.5);

    for (let i = 0; i < chocolateCount; i++) {
      this.chocolates.push({
        x: 140 + i * (110 + level * 3),
        y: 140 + Math.sin(i) * 50 - level * 3,
        collected: false
      });
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    this.keys[e.key] = true;
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys[e.key] = false;
  };

  private die() {
    this.gameOver = true;
    this.score = this.levelStartScore;
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  // ← ADD THE HELPER METHOD HERE
  private drawLargeBamboo(x: number, y: number) {
    // Main stalk
    this.ctx.fillStyle = '#4ade80';
    this.ctx.fillRect(x, y, 18, 180);

    // Segments
    this.ctx.strokeStyle = '#166534';
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + 50);
    this.ctx.lineTo(x + 18, y + 50);
    this.ctx.moveTo(x, y + 100);
    this.ctx.lineTo(x + 18, y + 100);
    this.ctx.moveTo(x, y + 150);
    this.ctx.lineTo(x + 18, y + 150);
    this.ctx.stroke();

    // Leaves
    this.ctx.fillStyle = '#22c55e';
    
    // Left leaves
    this.ctx.beginPath();
    this.ctx.ellipse(x - 18, y + 30, 22, 8, -0.6, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(x - 15, y + 80, 20, 7, -0.5, 0, Math.PI * 2);
    this.ctx.fill();

    // Right leaves
    this.ctx.beginPath();
    this.ctx.ellipse(x + 36, y + 45, 22, 8, 0.6, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(x + 33, y + 110, 20, 7, 0.5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private gameLoop = () => {
    if (!this.showGame) return;

    // Game logic only after start
    if (!this.gameOver && this.gameStarted) {
      this.player.vx = 0;

      if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A'] || this.mobileLeft) {
        this.player.vx = -5.5;
        this.facingRight = false;
      }
      if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D'] || this.mobileRight) {
        this.player.vx = 5.5;
        this.facingRight = true;
      }

      if ((this.keys[' '] || this.keys['ArrowUp'] || this.keys['w'] || this.keys['W'] || this.mobileJump) && !this.player.jumping) {
        this.player.vy = -15;
        this.player.jumping = true;
      }

      this.player.vy += 0.75;
      this.player.x += this.player.vx;
      this.player.y += this.player.vy;

      // Platform collision
      this.player.jumping = true;
      for (const p of this.platforms) {
        if (
          this.player.x < p.x + p.width &&
          this.player.x + this.player.width > p.x &&
          this.player.y + this.player.height > p.y &&
          this.player.y + this.player.height < p.y + p.height + 15 &&
          this.player.vy >= 0
        ) {
          this.player.y = p.y - this.player.height;
          this.player.vy = 0;
          this.player.jumping = false;
        }
      }

      if (this.player.x < 0) this.player.x = 0;
      if (this.player.y > 400) this.die();

      // Bamboo collision
      for (const s of this.spikes) {
        const bambooTop = s.y - (s.tall ? 35 : 15);
        if (
          this.player.x < s.x + s.width &&
          this.player.x + this.player.width > s.x &&
          this.player.y + this.player.height > bambooTop &&
          this.player.y < s.y + 20
        ) {
          this.die();
        }
      }

      // Collect chocolates
      for (const c of this.chocolates) {
        if (!c.collected &&
            this.player.x < c.x + 20 &&
            this.player.x + this.player.width > c.x &&
            this.player.y < c.y + 20 &&
            this.player.y + this.player.height > c.y) {
          c.collected = true;
          this.ngZone.run(() => {
            this.score += 10;
            this.cdr.detectChanges();
          });
        }
      }

      // Win condition
      if (this.player.x > 720) {
        this.ngZone.run(() => {
          this.level++;
          this.cdr.detectChanges();

          if (this.level > 10) {
            alert(`🎉 You completed all 10 levels!\n\nFinal Score: ${this.score}`);
            this.closeGame();
            return;
          }
          this.loadLevel(this.level);
        });
      }
    }

    // ========== DRAW ==========
    this.ctx.clearRect(0, 0, 800, 400);

    // Background
    if (this.backgroundImage.complete && this.backgroundImage.naturalWidth > 0) {
      this.ctx.drawImage(this.backgroundImage, 0, 0, 800, 400);
    } else {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e293b');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, 800, 400);
    }

// ===== START SCREEN =====
if (!this.gameStarted) {
  // Draw the ground
  this.ctx.fillStyle = '#14532d';
  this.ctx.fillRect(0, 320, 800, 80);

  // Left large bamboo
  this.drawLargeBamboo(120, 140);

  // Right large bamboo
  this.drawLargeBamboo(620, 140);

  // Draw a larger centered panda
  if (this.playerImage.complete && this.playerImage.naturalWidth > 0) {
    const size = 260;
    const x = (800 - size) / 2;
    const y = (400 - size) / 2 - 10;

    this.ctx.globalAlpha = 0.9;
    this.ctx.drawImage(this.playerImage, x, y, size, size);
    this.ctx.globalAlpha = 1;
  }

  this.animationId = requestAnimationFrame(this.gameLoop);
  return;
}

    // Platforms
    for (const p of this.platforms) {
      this.ctx.fillStyle = p.y >= 320 ? '#14532d' : '#5c4033';
      this.ctx.fillRect(p.x, p.y, p.width, p.height);
      if (p.y < 320) {
        this.ctx.fillStyle = '#7a5c45';
        this.ctx.fillRect(p.x, p.y, p.width, 3);
      }
    }

    // Bamboo
    for (const s of this.spikes) {
      const stalkHeight = s.tall ? 55 : 35;
      const stalkY = s.y - (s.tall ? 35 : 15);

      this.ctx.fillStyle = '#4ade80';
      this.ctx.fillRect(s.x + s.width / 2 - 4, stalkY, 8, stalkHeight);

      this.ctx.strokeStyle = '#166534';
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(s.x + s.width / 2 - 4, stalkY + 15);
      this.ctx.lineTo(s.x + s.width / 2 + 4, stalkY + 15);
      if (s.tall) {
        this.ctx.moveTo(s.x + s.width / 2 - 4, stalkY + 35);
        this.ctx.lineTo(s.x + s.width / 2 + 4, stalkY + 35);
      }
      this.ctx.stroke();

      this.ctx.fillStyle = '#22c55e';
      this.ctx.beginPath();
      this.ctx.ellipse(s.x + s.width / 2 - 10, stalkY + 5, 10, 4, -0.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.ellipse(s.x + s.width / 2 + 10, stalkY + 8, 10, 4, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Chocolates
    for (const c of this.chocolates) {
      if (!c.collected) {
        this.ctx.font = '22px Arial';
        this.ctx.fillText('🍫', c.x, c.y + 18);
      }
    }

    // Goal
    this.ctx.fillStyle = '#eab308';
    this.ctx.fillRect(740, 230, 45, 90);
    this.ctx.fillStyle = '#ca8a04';
    this.ctx.fillRect(755, 260, 15, 25);

    // Player
    if (this.playerImage.complete && this.playerImage.naturalWidth > 0) {
      this.ctx.save();
      if (this.facingRight) {
        this.ctx.translate(this.player.x + this.player.width, this.player.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(this.playerImage, 0, 0, this.player.width, this.player.height);
      } else {
        this.ctx.drawImage(this.playerImage, this.player.x, this.player.y, this.player.width, this.player.height);
      }
      this.ctx.restore();
    } else {
      this.ctx.fillStyle = '#10b981';
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }

    // Game Over
    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      this.ctx.fillRect(0, 0, 800, 400);
      this.ctx.fillStyle = '#ef4444';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('GAME OVER', 400, 180);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '22px Arial';
      this.ctx.fillText('Tap the Retry button below', 400, 240);
      this.ctx.textAlign = 'left';
    }

    if (this.gameOver && (this.keys['r'] || this.keys['R'])) {
      this.retryLevel();
    }

    this.animationId = requestAnimationFrame(this.gameLoop);
  };
}