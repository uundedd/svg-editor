import { Inject, NgModule } from '@angular/core';
import { LAYER_MANGER } from '../../../model/layer-manager.model';
import { LayerManagerService } from '../../layout-manager/app/service/layer-manager.service';

@NgModule()
export class SvgEditorModule {
  constructor(@Inject(LAYER_MANGER) layerManager: LayerManagerService) {
    layerManager.setComponent('svg-editor', () => {
      return import('./component/svg-editor/svg-editor.component').then(
        (file) => {
          return file.SvgEditorComponent;
        },
      );
    });
  }
}
