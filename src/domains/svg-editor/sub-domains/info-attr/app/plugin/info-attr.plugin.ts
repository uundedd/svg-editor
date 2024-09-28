import { Inject, Injectable } from '@angular/core';
import { SvgEditorService } from '../../../../app/service/svg-editor.service';
import {
  LAYER_MANGER,
  LayerManager,
} from '../../../../../../model/layer-manager.model';
import { uniqueId } from '../../../../../../app/utils/unique-id';

@Injectable()
export class infoAttrPlugin {
  name = 'attr-info-' + uniqueId();

  constructor(
    svgEditorService: SvgEditorService,
    @Inject(LAYER_MANGER) private layerManager: LayerManager,
  ) {
    svgEditorService.addSpeedDialMenu([
      {
        icon: 'pi pi-info',
        command: () => {
          this.layerManager.addComponent(this.name);
        },
      },
    ]);
  }

  static importer() {
    return import('../component/attr-info/attr-info.component').then((file) => {
      return file.AttrInfoComponent;
    });
  }
}
