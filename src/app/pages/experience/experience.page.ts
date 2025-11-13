import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { TimelineItemComponent } from '../../components/timeline-item/timeline-item.component';
import { ExperienceItem } from '../../models/content.models';


@Component({
standalone: true,
selector: 'app-experience',
imports: [AsyncPipe, RouterLink, TimelineItemComponent],
templateUrl: './experience.page.html',
})
export class ExperiencePage {
  data$ = inject(ContentService).load();

  calculateYearsExperience(experience: ExperienceItem[] | undefined): number {
    if (!experience || experience.length === 0) return 0;

    const earliestStart = experience.reduce((earliest, exp) => {
      const expDate = new Date(exp.start + '-01');
      return !earliest || expDate < earliest ? expDate : earliest;
    }, null as Date | null);

    if (!earliestStart) return 0;

    const now = new Date();
    const years = (now.getTime() - earliestStart.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(years);
  }

  getTotalProjects(experience: ExperienceItem[] | undefined): number {
    if (!experience) return 0;
    return experience.length * 5;
  }
}

