import { Component, Input } from '@angular/core';


@Component({
selector: 'app-section-header',
standalone: true,
templateUrl: `./section-header.component.html`,
})
export class SectionHeaderComponent {
@Input() title = '';
@Input() subtitle?: string;
}
