import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';


@Component({
standalone: true,
selector: 'app-about',
imports: [AsyncPipe, RouterLink],
templateUrl: './about.page.html',
})
export class AboutPage {
  data$ = inject(ContentService).load();

  getBulletTitle(bullet: string): string {
    const colonIndex = bullet.indexOf(':');
    return colonIndex > 0 ? bullet.substring(0, colonIndex) : '';
  }

  getBulletText(bullet: string): string {
    const colonIndex = bullet.indexOf(':');
    return colonIndex > 0 ? bullet.substring(colonIndex + 1).trim() : bullet;
  }

  getResumeUrl(contact: { resume?: string } | undefined): string | undefined {
    return contact?.resume;
  }
}

