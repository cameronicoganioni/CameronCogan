import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashScreenComponent,NavigationComponent
    
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Cameronsite');
}
