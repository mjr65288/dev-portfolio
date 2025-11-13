import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';


@Component({
standalone: true,
selector: 'app-about',
imports: [AsyncPipe, RouterLink],
templateUrl: './about.page.html',
})
export class AboutPage implements OnInit, OnDestroy {
  data$ = inject(ContentService).load();

  ngOnInit() {
    // Ensure scrolling is enabled on about page (in case it was disabled on home)
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    // Scroll to top when entering the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  getBulletTitle(bullet: string): string {
    const colonIndex = bullet.indexOf(':');
    return colonIndex > 0 ? bullet.substring(0, colonIndex).trim() : '';
  }

  getBulletText(bullet: string): string {
    const colonIndex = bullet.indexOf(':');
    return colonIndex > 0 ? bullet.substring(colonIndex + 1).trim() : bullet;
  }

  getCategoryIcon(category: string): string {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('frontend') || categoryLower.includes('front')) {
      return 'pi pi-desktop';
    } else if (categoryLower.includes('backend') || categoryLower.includes('back')) {
      return 'pi pi-server';
    } else if (categoryLower.includes('devops') || categoryLower.includes('dev')) {
      return 'pi pi-cloud';
    } else if (categoryLower.includes('testing') || categoryLower.includes('test')) {
      return 'pi pi-verified';
    } else if (categoryLower.includes('tool')) {
      return 'pi pi-wrench';
    } else if (categoryLower.includes('practice') || categoryLower.includes('method')) {
      return 'pi pi-check-circle';
    }
    return 'pi pi-check-circle'; // default icon
  }

  getResumeUrl(contact: { resume?: string } | undefined): string | undefined {
    return contact?.resume;
  }
}

