import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ContentService } from './services/content.service';
import { ThemeService } from './services/theme.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Menubar, AsyncPipe, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  // Inject services the right way (new way instead of constructor)
  private contentService = inject(ContentService);
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  // Keep a lightweight destroy$ subject to unsubscribe from observables
  private destroy$ = new Subject<void>();

  // Load content once and share it across subscribers
  readonly data$ = this.contentService.load();

  // Track current route
  currentRoute = signal<string>('');

  // Expose theme for template
  readonly theme = this.themeService.theme;

  items: MenuItem[] = [
    { label: 'Home', routerLink: '/', routerLinkActiveOptions: { exact: true }, icon: 'pi pi-home' },
    { label: 'About', routerLink: '/about', icon: 'pi pi-user' },
    { label: 'Experience', routerLink: '/experience', icon: 'pi pi-briefcase' },
    { label: 'Projects', routerLink: '/projects', icon: 'pi pi-folder-open' },
    { label: 'Contact', routerLink: '/contact', icon: 'pi pi-envelope' },
  ];

  // Computed items with active state
  menuItems = computed(() => {
    const currentUrl = this.currentRoute();
    return this.items.map(item => {
      if (!item.routerLink) return item;

      const itemPath = item.routerLink === '/' ? '/' : `/${item.routerLink}`;
      const isActive = item.routerLink === '/'
        ? currentUrl === '/'
        : currentUrl === itemPath || currentUrl.startsWith(`${itemPath}/`);

      return {
        ...item,
        styleClass: isActive ? 'active-menu-item' : ''
      };
    });
  });

  toggleTheme() {
    this.themeService.toggleTheme();
  }


  ngOnInit() {
    // Set initial route
    this.currentRoute.set(this.router.url);

    // Listen to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.urlAfterRedirects);
      });

    this.data$.subscribe(data => {
      // Set default page title
      this.title.setTitle(`${data.name} — ${data.role}`);

      // Update meta tags
      this.meta.updateTag({ name: 'description', content: data.about.summary });
      this.meta.updateTag({ name: 'author', content: data.name });

      // Open Graph tags
      this.meta.updateTag({ property: 'og:title', content: `${data.name} — ${data.role}` });
      this.meta.updateTag({ property: 'og:description', content: data.about.summary });
      this.meta.updateTag({ property: 'og:type', content: 'website' });

      // Twitter Card tags
      this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
      this.meta.updateTag({ name: 'twitter:title', content: `${data.name} — ${data.role}` });
      this.meta.updateTag({ name: 'twitter:description', content: data.about.summary });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
