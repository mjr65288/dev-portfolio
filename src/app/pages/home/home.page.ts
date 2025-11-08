import { Component, inject, SimpleChanges } from '@angular/core';
import { AsyncPipe, SlicePipe, NgClass } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';


@Component({
standalone: true,
selector: 'app-home',
imports: [AsyncPipe, SlicePipe, NgClass, ProjectCardComponent, SectionHeaderComponent],
templateUrl: './home.page.html',
})
export class HomePage {
private content = inject(ContentService);
readonly data$ = this.content.load();

ngChanges(changes: SimpleChanges) {
  console.log(changes);
}
}

