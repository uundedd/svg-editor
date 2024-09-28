import { NgModule } from '@angular/core';
import { SvgEditorModule } from '../domains/svg-editor/app/svg-editor.module';
import { LayerManagerModule } from '../domains/layout-manager/app/layer-manager.module';

@NgModule({
  imports: [LayerManagerModule, SvgEditorModule],
  exports: [LayerManagerModule],
})
export class RootModule {}
