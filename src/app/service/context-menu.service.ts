import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  private cm: ContextMenu | undefined;

  lastElementPosition: [number, number] | undefined;

  private _items: MenuItem[] | undefined;
  get items() {
    return this._items;
  }

  setContextMenu(cm: ContextMenu) {
    this.cm = cm;
  }

  getContextEvent(items: MenuItem[]) {
    return (event: PointerEvent | undefined) => {
      this._items = items;
      if (
        event &&
        event.currentTarget &&
        this.cm &&
        Array.isArray(items) &&
        items.length > 0
      ) {
        this.cm.target = event.currentTarget as HTMLElement;
        this.lastElementPosition = d3.pointer(event);
        this.cm.show(event);
      }
    };
  }
}
