import {
  EnvironmentInjector,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { LAYER_MANGER } from '../../../../model/layer-manager.model';
import { LayerManagerService } from '../../../layout-manager/app/service/layer-manager.service';
import { LayerComponent } from '../../../../model/layer-component.model';

@Injectable()
export class SvgEditorPluginRegistry {
  constructor(
    @Inject(LAYER_MANGER) private layerManager: LayerManagerService,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector,
  ) {}

  setPlugin(plugin: {
    importer: () => Promise<new (...params: any[]) => LayerComponent>;
  }) {
    const instance = Injector.create({
      providers: [plugin as any],
      parent: this.injector,
    }).get(plugin);
    this.layerManager.setComponent(
      instance.name,
      () => {
        return plugin.importer();
      },
      {
        environmentInjector: this.environmentInjector,
        injector: this.injector,
      },
    );
  }
}
