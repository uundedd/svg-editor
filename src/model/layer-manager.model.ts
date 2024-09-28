import { EnvironmentInjector, Injector } from '@angular/core';
import { LayerComponent } from './layer-component.model';

export interface LayerManager {
  setComponent(
    name: string,
    importer: () => Promise<new (...params: any[]) => LayerComponent>,
    config?: {
      environmentInjector?: EnvironmentInjector;
      injector?: Injector;
    },
  ): void;
  addComponent(name: string): void;
}

export const LAYER_MANGER = 'LAYER_MANGER';
