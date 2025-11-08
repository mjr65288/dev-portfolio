import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { TimelineItemComponent } from '../../components/timeline-item/timeline-item.component';


@Component({
standalone: true,
selector: 'app-experience',
imports: [AsyncPipe, RouterLink, TimelineItemComponent],
templateUrl: './experience.page.html',
})
export class ExperiencePage {
data$ = inject(ContentService).load();
}

