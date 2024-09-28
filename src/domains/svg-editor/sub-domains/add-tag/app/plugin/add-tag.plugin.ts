import { Inject, Injectable } from '@angular/core';
import { SvgEditorService } from '../../../../app/service/svg-editor.service';
import {
  LAYER_MANGER,
  LayerManager,
} from '../../../../../../model/layer-manager.model';
import { uniqueId } from '../../../../../../app/utils/unique-id';

@Injectable()
export class addTagPlugin {
  name = 'add-tag-' + uniqueId();

  constructor(
    svgEditorService: SvgEditorService,
    @Inject(LAYER_MANGER) private layerManager: LayerManager,
  ) {
    svgEditorService.addContextMenu([
      {
        label: 'add text',
        icon: 'pi pi-tag',
        command: () => {
          this.layerManager.addComponent(this.name);
        },
      },
    ]);
  }

  static importer() {
    return import('../component/add-tag/add-tag.component').then((file) => {
      return file.AddTagComponent;
    });
  }
}
