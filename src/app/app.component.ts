import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';
import { Lara } from 'primeng/themes/lara';
import { CustomTheme } from './utils/custom-theme';
import { definePreset } from 'primeng/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'EkoUNIMED CBT';

  constructor(
    private router: Router,
    private titleService: Title,
    private config: PrimeNGConfig
  ) {
    const MyPreset = definePreset(Aura, {
      semantic: {
        colorScheme: {
          light: {
            surface: {
              0: '#ffffff', // Base surface color
              50: '#f9fafb', // Light gray
              100: '#f3f4f6', // Lighter gray
              200: '#e5e7eb', // Gray
              300: '#d1d5db', // Medium gray
              400: '#9ca3af', // Darker gray
              500: '#6b7280', // Dark gray
              600: '#4b5563', // Darker gray
              700: '#374151', // Even darker gray
              800: '#1f2937', // Very dark gray
              900: '#111827', // Almost black
              950: '#030712', // Deepest black
            },
            primary: {
              500: '#10b981', // Emerald green
              // Add other primary shades if needed
            },
            // Add more semantic styles as needed
          },
          dark: {
            surface: {
              0: '#1e1e1e', // Dark background
              50: '#2a2a2a', // Darker gray
              100: '#3a3a3a', // Medium dark gray
              200: '#4a4a4a', // Medium gray
              300: '#5a5a5a', // Light gray
              400: '#6a6a6a', // Light gray
              500: '#7a7a7a', // Lighter gray
              600: '#8a8a8a', // Very light gray
              700: '#9a9a9a', // Almost white
              800: '#e0e0e0', // Lightest gray
              900: '#ffffff', // White
              950: '#ffffff', // White
            },
            primary: {
              500: '#34d399', // Light emerald green
              // Add other primary shades if needed
            },
            // Add more semantic styles as needed
          },
        },
      },
    });

    this.config.theme.set({ preset: MyPreset });
  }

  ngOnInit(): void {
    // this.primengConfig.ripple = true;
    this.config.ripple.set(true);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getRouteTitle())
      )
      .subscribe((title) => {
        if (title) {
          this.titleService.setTitle(`${title} | ${this.title}`);
        }
      });
  }

  private getRouteTitle(): string {
    let route: ActivatedRoute = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data['title'] || '';
  }
}
