import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { rootRoutes } from './root.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const rootConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(rootRoutes),
    provideAnimations(),
  ],
};
