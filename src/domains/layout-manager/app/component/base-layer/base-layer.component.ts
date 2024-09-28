import {
  AfterViewInit,
  Component,
  ElementRef,
  EnvironmentInjector,
  Injector,
} from '@angular/core';
import { ComponentItem, GoldenLayout } from 'golden-layout';
import { initialConfig } from '../../constant/inital-layer.constant';
import { LayerManagerService } from '../../service/layer-manager.service';

@Component({
  template: '',
  selector: 'app-base-layer',
  styleUrl: './base-layer.component.scss',
})
export class BaseLayerComponent implements AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector,
    private layerManager: LayerManagerService,
  ) {}

  goldenLayout: GoldenLayout | undefined;

  ngAfterViewInit(): void {
    this.initialLayout();
  }

  async initialLayout() {
    this.goldenLayout = new GoldenLayout(this.elementRef.nativeElement);
    this.layerManager.setDefaultEnvironment({
      environmentInjector: this.environmentInjector,
      injector: this.injector,
    });
    await this.layerManager.registerGoldenLayout(this.goldenLayout);
    setTimeout(() => {
      if (this.goldenLayout) {
        this.goldenLayout.loadLayout(initialConfig);
      }
    }, 0);

    this.goldenLayout.addEventListener('itemDestroyed', (event) => {
      if (event.target instanceof ComponentItem) {
        if (this.layerManager.isDestroyable(event.target.component)) {
          event.target.component.destroy();
        }
      }
    });
  }
}
