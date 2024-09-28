import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { SvgEditorService } from '../../service/svg-editor.service';

@Component({
  selector: 'app-svg-speed-dial',
  standalone: true,
  imports: [NgIf, SpeedDialModule],
  template: `
    <ng-container *ngIf="items.length > 0">
      <p-speedDial
        [model]="items"
        radius="140"
        direction="down-right"
        type="quarter-circle"
        buttonClassName="p-button-success"
      />
    </ng-container>
  `,
  styleUrl: './svg-speed-dial.component.scss',
})
export class SvgSpeedDialComponent {
  get items() {
    return this.svgEditoService.speedDialItem;
  }
  constructor(private svgEditoService: SvgEditorService) {}
}
