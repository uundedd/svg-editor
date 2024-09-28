import { Component, signal } from '@angular/core';
import { LayerComponent } from '../../../../../../../model/layer-component.model';
import { ContextMenuService } from '../../../../../../../app/service/context-menu.service';
import { FormBuilderComponent } from '../../../../../../form-builder/app/component/form-builder/form-builder.component';
import { FbStringComponent } from '../../../../../../form-builder/app/component/fb-string/fb-string.component';
import { FbColorComponent } from '../../../../../../form-builder/app/component/fb-color/fb-color.component';
import { DividerModule } from 'primeng/divider';
import { FbNumberComponent } from '../../../../../../form-builder/app/component/fb-number/fb-number.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SvgEditorService } from '../../../../../app/service/svg-editor.service';
import * as d3 from 'd3';
import { ComponentContainer } from 'golden-layout';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-add-tag',
  standalone: true,
  imports: [
    FormBuilderComponent,
    FbStringComponent,
    FbColorComponent,
    FbNumberComponent,
    DividerModule,
    PanelModule,
    ButtonModule,
  ],
  templateUrl: './add-tag.component.html',
  styleUrl: './add-tag.component.scss',
})
export class AddTagComponent implements LayerComponent {
  constructor(
    private contextMenu: ContextMenuService,
    private svgEditorService: SvgEditorService,
  ) {}

  value = signal<Record<string, string | number>>({} as any);

  onAttach(container: ComponentContainer): void {
    this.svgEditorService.close.pipe(untilDestroyed(this)).subscribe(() => {
      container.close();
    });
  }

  submit() {
    if (this.svgEditorService.element && this.value()['text']) {
      const svg = d3.select(this.svgEditorService.element).select('svg');
      const xMouse = this.contextMenu.lastElementPosition?.[0];
      const yMoust = this.contextMenu.lastElementPosition?.[1];
      if (svg) {
        const text = svg.append('text').text(this.value()['text']);
        text.attr('x', String(xMouse));
        text.attr('y', String(yMoust));
        for (const [key, value] of Object.entries(this.value())) {
          if (!['x', 'y', 'text'].includes(key)) {
            text.attr(key, value);
          }
        }
      }
    }
  }
}
