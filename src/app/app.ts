import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Menubar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Projects', routerLink: '/projects' },
    { label: 'About', routerLink: '/about' },
    { label: 'Experience', routerLink: '/experience' },
    { label: 'Contact', routerLink: '/contact' },
  ]
}
