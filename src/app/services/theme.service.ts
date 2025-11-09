import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private readonly defaultTheme: Theme = 'dark';

  // Signal to track current theme
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply initial theme immediately
    this.applyTheme(this.theme());

    // Apply theme on initialization and when it changes
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme);
      this.saveTheme(currentTheme);
    });
  }

  private getInitialTheme(): Theme {
    // Check localStorage first
    const saved = localStorage.getItem(this.THEME_KEY) as Theme;
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return this.defaultTheme;
  }

  toggleTheme(): void {
    this.theme.update(current => current === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;

    if (theme === 'light') {
      root.classList.remove('dark-theme');
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
      root.classList.add('dark-theme');
    }
  }

  private saveTheme(theme: Theme): void {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme preference:', e);
    }
  }
}

