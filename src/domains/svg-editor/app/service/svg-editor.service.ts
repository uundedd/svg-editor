import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SelectorService } from './selector.service';
import { Subject } from 'rxjs';

@Injectable()
export class SvgEditorService {
  private _contextMenuItem: MenuItem[] = [];
  get contextMenuItem() {
    return this._contextMenuItem;
  }

  private _speedDialItem: MenuItem[] = [
    {
      icon: 'pi pi-times',
      tooltip: 'close',
    },
  ];
  get speedDialItem() {
    return this._speedDialItem;
  }

  private _selectorService = new SelectorService({
    ['fill']: 'red',
    ['fill-rule']: 'nonzero',
    ['fill-opacity']: '0.3',
  });

  private _element: Element | undefined;

  set element(element: Element | undefined) {
    if (element) {
      this._element = element;
      this.selectorService.inital(element);
    }
  }

  get element() {
    return this._element;
  }

  get selectorService() {
    return this._selectorService;
  }

  private _close = new Subject<true>();
  get close() {
    return this._close;
  }

  setPriview() {
    console.log('preview called');
    this._close.next(true);
    this.selectorService.destroy();
  }

  addContextMenu(item: MenuItem[] | undefined) {
    if (Array.isArray(item)) {
      this._contextMenuItem.push(...item);
    }
  }
  addSpeedDialMenu(item: MenuItem[] | undefined) {
    if (Array.isArray(item)) {
      this._speedDialItem.push(...item);
    }
  }
}
