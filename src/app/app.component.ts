import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';

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
    this.config.theme.set({ preset: Aura });
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
