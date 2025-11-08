import { Routes } from '@angular/router';


export const routes: Routes = [
{ path: '', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage), title: 'Home — Your Name' },
{ path: 'projects', loadComponent: () => import('./pages/projects/projects.page').then(m => m.ProjectsPage), title: 'Projects — Your Name' },
{ path: 'about', loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage), title: 'About — Your Name' },
{ path: 'experience', loadComponent: () => import('./pages/experience/experience.page').then(m => m.ExperiencePage), title: 'Experience — Your Name' },
{ path: 'contact', loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage), title: 'Contact — Your Name' },
{ path: '**', redirectTo: '' }
];
