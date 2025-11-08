import { Component, inject, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe, SlicePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';


@Component({
standalone: true,
selector: 'app-home',
imports: [AsyncPipe, SlicePipe, NgClass, RouterLink, ProjectCardComponent, SectionHeaderComponent],
templateUrl: './home.page.html',
})
export class HomePage implements OnInit, OnDestroy {
private content = inject(ContentService);
readonly data$ = this.content.load();

rotatingPhrases = [
  'Building performant web apps',
  'Crafting developer tools',
  'Mentoring teams',
  'Solving complex problems'
];
currentPhraseIndex = 0;
currentPhrase = this.rotatingPhrases[0];
private rotationInterval?: number;

ngOnInit() {
  this.startRotation();
}

ngOnDestroy() {
  if (this.rotationInterval) {
    clearInterval(this.rotationInterval);
  }
}

private startRotation() {
  this.rotationInterval = window.setInterval(() => {
    this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.rotatingPhrases.length;
    this.currentPhrase = this.rotatingPhrases[this.currentPhraseIndex];
  }, 3000); // Change every 3 seconds
}

ngChanges(changes: SimpleChanges) {
  console.log(changes);
}
}

