import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseLayerComponent } from './component/base-layer/base-layer.component';
import { LAYER_MANGER } from '../../../model/layer-manager.model';
import { LayerManagerService } from './service/layer-manager.service';

@NgModule({
  imports: [CommonModule],
  declarations: [BaseLayerComponent],
  providers: [
    LayerManagerService,
    {
      provide: LAYER_MANGER,
      useExisting: LayerManagerService,
    },
  ],
  exports: [BaseLayerComponent],
})
export class LayerManagerModule {}
