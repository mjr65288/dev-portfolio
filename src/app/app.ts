import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ContentService } from './services/content.service';
import { AsyncPipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Menubar, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  private contentService = inject(ContentService);
  private title = inject(Title);
  private meta = inject(Meta);
  data$ = this.contentService.load();

  items: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Projects', routerLink: '/projects' },
    { label: 'About', routerLink: '/about' },
    { label: 'Experience', routerLink: '/experience' },
    { label: 'Contact', routerLink: '/contact' },
  ];

  ngOnInit() {
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
}
