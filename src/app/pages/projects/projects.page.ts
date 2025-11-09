import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project } from '../../models/content.models';


@Component({
standalone: true,
selector: 'app-projects',
imports: [AsyncPipe, ProjectCardComponent],
templateUrl: './projects.page.html',
})
export class ProjectsPage {
  data$ = inject(ContentService).load();
  selectedFilter = signal<string | null>(null);

  getAllTechnologies(projects: Project[] | undefined): string[] {
    if (!projects) return [];
    const techSet = new Set<string>();
    projects.forEach(p => {
      p.tags?.forEach(tag => techSet.add(tag));
    });
    return Array.from(techSet).sort();
  }

  getFilteredProjects(projects: Project[] | undefined): Project[] {
    if (!projects) return [];
    const filter = this.selectedFilter();
    if (!filter) return projects;
    return projects.filter(p => p.tags?.includes(filter));
  }
}

