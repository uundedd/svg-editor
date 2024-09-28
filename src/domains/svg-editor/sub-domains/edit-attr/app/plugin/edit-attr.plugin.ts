import { Inject, Injectable } from '@angular/core';
import { SvgEditorService } from '../../../../app/service/svg-editor.service';
import {
  LAYER_MANGER,
  LayerManager,
} from '../../../../../../model/layer-manager.model';
import { uniqueId } from '../../../../../../app/utils/unique-id';

@Injectable()
export class editAttrPlugin {
  name = 'edit-attr' + uniqueId();

  constructor(
    svgEditorService: SvgEditorService,
    @Inject(LAYER_MANGER) private layerManager: LayerManager,
  ) {
    svgEditorService.addSpeedDialMenu([
      {
        label: 'edit attributes',
        icon: 'pi pi-file-edit',
        command: () => {
          this.layerManager.addComponent(this.name);
        },
      },
    ]);
  }

  static importer() {
    return import('../component/edit-attr/edit-attr.component').then((file) => {
      return file.EditAttrComponent;
    });
  }
}
