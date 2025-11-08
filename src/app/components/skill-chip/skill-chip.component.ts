import { Component, Input } from '@angular/core';


@Component({
selector: 'app-skill-chip',
standalone: true,
templateUrl: `./skill-chip.component.html`,
})
export class SkillChipComponent { @Input() name = ''; }
