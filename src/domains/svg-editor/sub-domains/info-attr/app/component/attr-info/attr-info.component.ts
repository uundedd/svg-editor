import { Component, OnInit } from '@angular/core';
import { LayerComponent } from '../../../../../../../model/layer-component.model';
import { SvgEditorService } from '../../../../../app/service/svg-editor.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { nodeMaptoArray } from '../../../../../utils/node-map-to-array';
import { SelectorService } from '../../../../../app/service/selector.service';
import { ComponentContainer } from 'golden-layout';

@UntilDestroy()
@Component({
  selector: 'app-attr-info',
  standalone: true,
  imports: [CommonModule, DataViewModule, DividerModule],
  templateUrl: './attr-info.component.html',
  styleUrl: './attr-info.component.scss',
})
export class AttrInfoComponent implements LayerComponent, OnInit {
  attibutes: NamedNodeMap[number][] = [];
  constructor(private svgEditorService: SvgEditorService) {}
  onAttach(container: ComponentContainer): void {
    this.svgEditorService.close.pipe(untilDestroyed(this)).subscribe(() => {
      console.log('closed');
      container.close();
    });
  }

  ngOnInit(): void {
    this.svgEditorService.selectorService
      .getHoverElement()
      .pipe(untilDestroyed(this))
      .subscribe((element) => {
        if (element) {
          const beforeHover = (element as any)[SelectorService.orginalKey];
          this.attibutes = nodeMaptoArray(element.attributes).map((attr) => {
            const beforeValue = beforeHover?.[attr.nodeName];
            if (beforeValue && attr.value) {
              return { ...attr, value: beforeValue, nodeValue: beforeValue };
            }
            return attr;
          });
        }
      });
  }
}
