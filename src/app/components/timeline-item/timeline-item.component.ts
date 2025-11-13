import { Component, Input } from '@angular/core';
import { Tag } from 'primeng/tag';


@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [Tag],
  templateUrl: `./timeline-item.component.html`,
})
export class TimelineItemComponent {
  @Input() company = '';
  @Input() role = '';
  @Input() start!: string;
  @Input() end?: string;
  @Input() location?: string;
  @Input() url?: string;
  @Input() description?: string;
  @Input() tech?: string[] | { [category: string]: string[] };       // e.g. ["Angular", "Next.js"] or { "Frontend": ["Angular"] }
  @Input() bullets: string[] = [];

  formatDate(dateStr: string): string {
    // Convert "2023-05" to "May 2023"
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  isTechCategorized(): boolean {
    return this.tech !== undefined && !Array.isArray(this.tech);
  }

  getTechCategories(): string[] {
    if (this.isTechCategorized()) {
      return Object.keys(this.tech as { [category: string]: string[] });
    }
    return [];
  }

  getTechByCategory(category: string): string[] {
    if (this.isTechCategorized()) {
      return (this.tech as { [category: string]: string[] })[category] || [];
    }
    return [];
  }

  getTechArray(): string[] {
    if (Array.isArray(this.tech)) {
      return this.tech;
    }
    return [];
  }
}
