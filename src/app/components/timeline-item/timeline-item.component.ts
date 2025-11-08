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
  @Input() start!: string;        // ISO-like e.g. "2023-04"
  @Input() end?: string;          // optional
  @Input() location?: string;
  @Input() url?: string;
  @Input() tech?: string[];       // e.g. ["Angular", "Next.js", "Spring Boot"]
  @Input() bullets: string[] = [];

  formatDate(dateStr: string): string {
    // Convert "2023-05" to "May 2023"
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}
