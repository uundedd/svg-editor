import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { ContextMenuService } from '../../service/context-menu.service';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [ContextMenuModule],
  template: '<p-contextMenu #cm [model]="items"/> ',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent implements OnInit {
  @ViewChild('cm') set cm(contextMenu: ContextMenu) {
    this.cmService.setContextMenu(contextMenu);
  }

  get items() {
    return this.cmService.items;
  }

  constructor(private cmService: ContextMenuService) {}

  ngOnInit(): void {
    if (this.cm) {
      this.cmService.setContextMenu(this.cm);
    }
  }
}
