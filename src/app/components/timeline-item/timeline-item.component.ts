import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-timeline-item',
  standalone: true,
  templateUrl: `./timeline-item.component.html`,
})
export class TimelineItemComponent {
  @Input() company = '';
  @Input() role = '';
  @Input() start = '';
  @Input() end?: string;
  @Input() bullets: string[] = [];
}
