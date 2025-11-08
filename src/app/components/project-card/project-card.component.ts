import { Component, Input } from '@angular/core';
import { Tag } from 'primeng/tag';


export interface ProjectCardInput {
  title: string; description: string; tags: string[]; repo?: string; demo?: string; image?: string;
}

type TagSeverity = 'danger' | 'success' | 'info' | 'warn' | 'secondary' | 'contrast' | null | undefined;

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [Tag],
  templateUrl: `./project-card.component.html`,
})
export class ProjectCardComponent {
  @Input() project!: ProjectCardInput;

  getTagSeverity(tag: string): TagSeverity {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('angular')) {
      return 'danger';
    }
    return null; // Use custom styles for others
  }

  getTagStyle(tag: string): string {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('rxjs')) {
      return 'background: #9333ea; color: white;';
    }
    if (tagLower.includes('next.js') || tagLower.includes('nextjs')) {
      return 'background: #6b7280; color: white;';
    }
    if (tagLower.includes('stripe')) {
      return 'background: #635bff; color: white;';
    }
    return '';
  }
}
