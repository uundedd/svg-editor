import { LayoutConfig } from 'golden-layout';

export const initialConfig: LayoutConfig = {
  root: undefined,
  content: [
    {
      type: 'row',
      content: [
        {
          componentType: 'svg-editor',
          type: 'component',
          componentName: 'testComponent',
          componentState: { label: 'B' },
        },
        {
          componentType: 'svg-editor',
          type: 'component',
          componentName: 'testComponent',
          componentState: { label: 'C' },
        },
      ],
    },
  ],
};
