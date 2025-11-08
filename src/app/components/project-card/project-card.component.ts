import { Component, Input } from '@angular/core';
import { Tag } from 'primeng/tag';


export interface ProjectCardInput {
  title: string; description: string; tags: string[]; repo?: string; demo?: string; image?: string;
}


@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [Tag],
  templateUrl: `./project-card.component.html`,
})
export class ProjectCardComponent {
  @Input() project!: ProjectCardInput;
}
