import {
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Injector,
} from '@angular/core';
import { LayerComponent } from '../../../../model/layer-component.model';
import { LayerManager } from '../../../../model/layer-manager.model';
import { ComponentContainer, GoldenLayout, JsonValue } from 'golden-layout';
import { LazyloaderService } from '../../../../app/service/lazy-loader.service';

@Injectable()
export class LayerManagerService implements LayerManager {
  private goldenLayoutResolver: ((input: GoldenLayout) => void) | undefined;
  private goldenLayout = new Promise<GoldenLayout>((resovler) => {
    this.goldenLayoutResolver = resovler;
  });
  private repo = new Map<
    string,
    {
      importer: () => Promise<new (...params: any[]) => LayerComponent>;
      config?: {
        environmentInjector?: EnvironmentInjector;
        injector?: Injector;
      };
    }
  >();

  private defaultEnvironment:
    | {
        environmentInjector: EnvironmentInjector;
        injector: Injector;
      }
    | undefined;

  setDefaultEnvironment(options: {
    environmentInjector: EnvironmentInjector;
    injector: Injector;
  }) {
    this.defaultEnvironment = options;
  }

  constructor(private lazyLoader: LazyloaderService) {}

  private getComponentClass(
    componentImporter: () => Promise<new (...params: any[]) => LayerComponent>,
    options: {
      environmentInjector?: EnvironmentInjector;
      injector?: Injector;
    },
    lazyLoader = this.lazyLoader,
  ) {
    return class {
      private componentRef: ComponentRef<LayerComponent> | undefined;
      constructor(
        private container: ComponentContainer,
        private state: JsonValue | undefined,
        private virtual: boolean,
      ) {
        this.loadComponent();
      }

      async loadComponent() {
        this.componentRef = await lazyLoader.loadInElement(
          componentImporter,
          this.container.element,
          {
            environmentInjector: options.environmentInjector,
            injector: options.injector,
          },
        );
        this.componentRef.instance?.onAttach?.(
          this.container,
          this.state,
          this.virtual,
        );
      }
      destroy() {
        if (this.componentRef) {
          lazyLoader.destroyComponentFromElement(this.componentRef);
        }
      }
    };
  }

  async setComponent(
    name: string,
    importer: () => Promise<new (...params: any[]) => LayerComponent>,
    config?: {
      environmentInjector?: EnvironmentInjector;
      injector?: Injector;
    },
  ) {
    if (!this.repo.get(name)) {
      this.repo.set(name, { config, importer });
      const goldenLayout = await this.goldenLayout;
      goldenLayout?.registerComponentConstructor(
        name,
        this.getComponentClass(importer, {
          environmentInjector:
            config?.environmentInjector ??
            this.defaultEnvironment?.environmentInjector,
          injector: config?.injector ?? this.defaultEnvironment?.injector,
        }),
      );
    }
  }

  getAllComponent() {
    return this.repo.entries();
  }

  registerGoldenLayout(goldenLayout: GoldenLayout) {
    setTimeout(() => {
      if (this.goldenLayoutResolver) {
        this.goldenLayoutResolver(goldenLayout);
      }
    }, 0);

    return this.goldenLayout;
  }

  isDestroyable(input: any): input is { destroy(): any } {
    return typeof input?.destroy === 'function';
  }

  async addComponent(name: string) {
    const goldenLayout = await this.goldenLayout;
    goldenLayout?.addComponent(name);
  }

  async removeComponent(name: string) {
    const layout = await this.goldenLayout;
    layout.clearComponentFocus;
  }
}
