import { GoldenLayout } from 'golden-layout';

export interface LayerComponent {
  onAttach?: (
    ...params: ConstructorParameters<GoldenLayout.ComponentConstructor>
  ) => void;
}
