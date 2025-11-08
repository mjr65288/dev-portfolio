import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';


@Component({
standalone: true,
selector: 'app-projects',
imports: [AsyncPipe, ProjectCardComponent],
templateUrl: './projects.page.html',
})
export class ProjectsPage {
data$ = inject(ContentService).load();
}

