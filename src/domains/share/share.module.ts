import { NgModule } from '@angular/core';
import { SafeUrlPipe } from './app/pipe/safe-url.pipe';
import { SafeHtmlPipe } from './app/pipe/safe-html.pipe';

@NgModule({
  imports: [],
  declarations: [SafeUrlPipe, SafeHtmlPipe],
  providers: [],
  exports: [SafeUrlPipe, SafeHtmlPipe],
})
export class ShareModule {}
