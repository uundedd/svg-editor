import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootModule } from '../../root.module';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, ContextMenuComponent, RootModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent {
  title = 'svg-editor';

  data: number[] = [];
}
