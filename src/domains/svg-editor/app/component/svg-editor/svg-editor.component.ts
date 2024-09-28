import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntilDestroy } from '@ngneat/until-destroy';
import { LayerComponent } from '../../../../../model/layer-component.model';
import { FormBuilderComponent } from '../../../../form-builder/app/component/form-builder/form-builder.component';
import { FbFileUploadComponent } from '../../../../form-builder/app/component/fb-file-upload/fb-file-upload.component';
import { ContextMenuService } from '../../../../../app/service/context-menu.service';
import { SvgSpeedDialComponent } from '../svg-speed-dial/svg-speed-dial.component';
import { SvgEditorPluginRegistry } from '../../service/plugin-registry.service';
import { ShareModule } from '../../../../share/share.module';
import { infoAttrPlugin } from '../../../sub-domains/info-attr/app/plugin/info-attr.plugin';
import { SvgEditorService } from '../../service/svg-editor.service';
import { addTagPlugin } from '../../../sub-domains/add-tag/app/plugin/add-tag.plugin';
import * as d3 from 'd3';
import { editAttrPlugin } from '../../../sub-domains/edit-attr/app/plugin/edit-attr.plugin';

@UntilDestroy()
@Component({
  selector: 'app-svg-editor',
  standalone: true,
  imports: [
    CommonModule,
    SvgSpeedDialComponent,
    FormBuilderComponent,
    FbFileUploadComponent,
    ShareModule,
  ],
  providers: [SvgEditorPluginRegistry, SvgEditorService],
  templateUrl: './svg-editor.component.html',
  styleUrl: './svg-editor.component.scss',
})
export class SvgEditorComponent implements LayerComponent, OnDestroy {
  @ViewChild('svgMap', { static: false }) set svgMap(
    element: ElementRef<HTMLElement>,
  ) {
    if (element?.nativeElement) {
      this.addZoomEvent(element?.nativeElement);
    }
  }
  @ViewChild('svgEl', { static: false }) set svgEl(
    element: ElementRef<HTMLElement>,
  ) {
    if (element?.nativeElement) {
      this.svgEditoService.element = element.nativeElement;
      d3.select(this.svgEditoService.element)
        .select('svg')
        .on('contextmenu', (event) => {
          this.cmService.getContextEvent(this.svgEditoService.contextMenuItem)(
            event,
          );
        });
    }
  }

  svg = '';

  contextPosition: PointerEvent | undefined;

  constructor(
    private cmService: ContextMenuService,
    private svgEditoService: SvgEditorService,
    svgPluginService: SvgEditorPluginRegistry,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    svgPluginService.setPlugin(infoAttrPlugin);
    svgPluginService.setPlugin(addTagPlugin);
    svgPluginService.setPlugin(editAttrPlugin);
    this.addRemove();
  }

  addRemove() {
    this.svgEditoService.addSpeedDialMenu([
      {
        icon: 'pi pi-trash',
        tooltip: 'remove svg file',
        command: () => {
          this.svg = '';
        },
      },
      {
        icon: 'pi pi-eye',
        tooltip: 'privew file',
        command: () => {
          this.svgEditoService.setPriview();
        },
      },
    ]);
  }

  addZoomEvent(element: Element) {
    const container = d3.select(element);
    const mainTag = container.select('.svg-editor');

    const zoom = d3.zoom().on('zoom', function (e) {
      mainTag.attr('transform', e.transform);
    });
    container.call(zoom as any);
  }

  onAttach(): void {}

  changeFile(event: { file: File[] }) {
    const svg = event.file?.[0];
    if (svg) {
      this.renderSvg(svg);
    }
  }

  renderSvg(svg: File) {
    const fileReader = new FileReader();
    fileReader.readAsText(svg);
    fileReader.onload = () => {
      this.svg = fileReader.result as string;
    };
  }

  ngOnDestroy(): void {
    this.svgEditoService.selectorService.destroy();
  }
}
