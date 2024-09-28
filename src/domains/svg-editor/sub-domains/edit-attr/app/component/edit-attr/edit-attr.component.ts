import { AfterViewInit, Component, signal } from '@angular/core';
import { LayerComponent } from '../../../../../../../model/layer-component.model';
import { SvgEditorService } from '../../../../../app/service/svg-editor.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilderComponent } from '../../../../../../form-builder/app/component/form-builder/form-builder.component';
import { FbStringComponent } from '../../../../../../form-builder/app/component/fb-string/fb-string.component';
import { FbColorComponent } from '../../../../../../form-builder/app/component/fb-color/fb-color.component';
import { FbNumberComponent } from '../../../../../../form-builder/app/component/fb-number/fb-number.component';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import {
  WidgetDetectorService,
  WidgetType,
} from '../../service/widget-detector.service';
import * as d3 from 'd3';
import { SelectorService } from '../../../../../app/service/selector.service';
import { nodeMaptoArray } from '../../../../../utils/node-map-to-array';
import { EditAnimationComponent } from '../edit-animation/edit-animation.component';
import { ComponentContainer } from 'golden-layout';

@UntilDestroy()
@Component({
  selector: 'app-edit-attry',
  standalone: true,
  imports: [
    FormBuilderComponent,
    FbStringComponent,
    FbColorComponent,
    FbNumberComponent,
    DividerModule,
    PanelModule,
    ButtonModule,
    EditAnimationComponent,
  ],
  templateUrl: './edit-attr.component.html',
  styleUrl: './edit-attr.component.scss',
})
export class EditAttrComponent implements LayerComponent, AfterViewInit {
  attibutes: {
    key: string;
    type: WidgetType;
  }[] = [];
  selectedElement: Element | undefined;

  value = signal<{
    [key: string]: string | number | null;
  }>({});
  constructor(
    private svgEditorService: SvgEditorService,
    private widgetDetector: WidgetDetectorService,
  ) {
    this.setDefaultAttr();
  }

  setDefaultAttr() {
    this.widgetDetector.setWidgetType('fill', 'color');
    this.widgetDetector.setWidgetType('stroke-width', 'number');
    this.widgetDetector.setWidgetType('fill-opacity', 'number');
  }

  onAttach(container: ComponentContainer): void {
    this.svgEditorService.close.pipe(untilDestroyed(this)).subscribe(() => {
      container.close();
    });
  }

  ngAfterViewInit(): void {
    this.svgEditorService.selectorService
      .getSelectedElement()
      .pipe(untilDestroyed(this))
      .subscribe((element) => {
        if (element) {
          this.attibutes = [];
          const value: {
            [key: string]: string | number | null;
          } = {};
          this.selectedElement = element;
          const beforeHover = (element as any)[SelectorService.orginalKey];
          for (const attr of nodeMaptoArray(element.attributes)) {
            this.attibutes.push({
              key: attr.nodeName,
              type: this.widgetDetector.getWidgetType(attr.nodeName) ?? 'text',
            });
            value[attr.nodeName] = attr.value
              ? (beforeHover[attr.nodeName] ?? attr.nodeValue)
              : attr.value;
          }
          setTimeout(() => {
            this.value.set(value);
          }, 0);
        }
      });
  }

  submit() {
    if (this.selectedElement) {
      const element = d3.select(this.selectedElement);
      for (const [key, value] of Object.entries(this.value())) {
        element.attr(key, value);
      }
    }
  }

  removeElement() {
    if (this.selectedElement) {
      d3.select(this.selectedElement).remove();
    }
  }
}
