import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { TimelineItemComponent } from '../../components/timeline-item/timeline-item.component';


@Component({
standalone: true,
selector: 'app-experience',
imports: [AsyncPipe, TimelineItemComponent],
templateUrl: './experience.page.html',
})
export class ExperiencePage {
data$ = inject(ContentService).load();
}

