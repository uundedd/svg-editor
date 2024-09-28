import { Component, signal } from '@angular/core';
import { SvgEditorService } from '../../../../../app/service/svg-editor.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilderComponent } from '../../../../../../form-builder/app/component/form-builder/form-builder.component';
import { FbStringComponent } from '../../../../../../form-builder/app/component/fb-string/fb-string.component';
import { FbColorComponent } from '../../../../../../form-builder/app/component/fb-color/fb-color.component';
import { FbNumberComponent } from '../../../../../../form-builder/app/component/fb-number/fb-number.component';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CsvAnimation } from '../../../model/animation.model';

import * as d3 from 'd3';

@UntilDestroy()
@Component({
  selector: 'app-edit-animation',
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
  templateUrl: './edit-animation.component.html',
  styleUrl: './edit-animation.component.scss',
})
export class EditAnimationComponent {
  selectedElement: Element | undefined;

  animation = signal<CsvAnimation | undefined>(undefined);

  constructor(private svgEdiorService: SvgEditorService) {
    this.listenToClickedElement();
  }

  listenToClickedElement() {
    this.svgEdiorService.selectorService
      .getSelectedElement()
      .pipe(untilDestroyed(this))
      .subscribe((element) => {
        if (element) {
          this.selectedElement = element;
          const animationEl = d3.select(this.selectedElement).select('animate');
          if (animationEl) {
            if (animationEl.size()) {
              const animation: CsvAnimation = {
                attributeName: animationEl.attr('attributeName'),
                begin: +animationEl.attr('begin').replace('s', ''),
                dur: +animationEl.attr('dur').replace('s', ''),
                from: animationEl.attr('from'),
                to: animationEl.attr('to'),
                repeatCount: 'indefinite',
              };
              this.animation.set(animation);
            }
          }
        }
      });
  }

  submit() {
    if (this.selectedElement) {
      const animationAttr = this.animation();
      d3.select(this.selectedElement)
        .selectAll('animate')
        .data([animationAttr])
        .join('animate')
        .attr('attributeName', (b) => {
          return String(b?.attributeName as string);
        })
        .attr('begin', (b) => {
          return b?.begin + 's';
        })
        .attr('dur', (b) => {
          return b?.dur + 's';
        })
        .attr('from', (b) => {
          return String(b?.from);
        })
        .attr('to', (b) => {
          return String(b?.to);
        })
        .attr('repeatCount', () => {
          return 'indefinite';
        });
    }
  }
}
