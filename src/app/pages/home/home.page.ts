import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { ContentService } from '../../services/content.service';


@Component({
standalone: true,
selector: 'app-home',
imports: [AsyncPipe, NgClass],
templateUrl: './home.page.html',
})
export class HomePage implements OnInit, OnDestroy {
private content = inject(ContentService);
readonly data$ = this.content.load();

ngOnInit() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

ngOnDestroy() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

calculateYearsExperience(): number {
  return 10;
}
}

