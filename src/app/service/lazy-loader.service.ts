import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LazyloaderService {
  constructor(
    private injector: Injector,
    private environmentInjector: EnvironmentInjector,
    private appRef: ApplicationRef,
  ) {}
  private async provideComponent<T>(
    importer: () => Promise<new (...params: any[]) => T>,
    options?: {
      environmentInjector?: EnvironmentInjector;
      injector?: Injector;
    },
  ): Promise<ComponentRef<T>> {
    const component = await importer();
    return createComponent<T>(component, {
      elementInjector: options?.injector,
      environmentInjector:
        options?.environmentInjector ?? this.environmentInjector,
    });
  }
  async loadInElement<T>(
    importer: () => Promise<new (...params: any[]) => T>,
    element: HTMLElement,
    options: {
      environmentInjector?: EnvironmentInjector;
      injector?: Injector;
    } = {
      environmentInjector: this.environmentInjector,
      injector: this.injector,
    },
  ) {
    const componentRef = await this.provideComponent(importer, options);
    componentRef.hostView;
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    element.appendChild(domElem);
    return componentRef;
  }

  async loadInContainerRef<T>(
    importer: () => Promise<new (...params: any[]) => T>,
    viewRef: ViewContainerRef,
    options: {
      environmentInjector: EnvironmentInjector;
      injector: Injector;
    } = {
      environmentInjector: this.environmentInjector,
      injector: this.injector,
    },
  ) {
    const componentRef = await importer();
    viewRef.createComponent(componentRef, options);
  }

  destroyComponentFromElement<T>(componentRef: ComponentRef<T>) {
    if (componentRef.hostView) {
      this.appRef.detachView(componentRef?.hostView);
    }
    componentRef?.destroy();
  }
}
