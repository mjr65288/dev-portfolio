import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../services/content.service';


@Component({
standalone: true,
selector: 'app-about',
imports: [AsyncPipe],
templateUrl: './about.page.html',
})
export class AboutPage {
data$ = inject(ContentService).load();
}

