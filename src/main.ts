/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { rootConfig } from './app/root.config';
import { RootComponent } from './app/component/root/root.component';

bootstrapApplication(RootComponent, rootConfig).catch((err) =>
  console.error(err),
);
