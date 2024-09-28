import { Injectable } from '@angular/core';

export type WidgetType = 'color' | 'text' | 'number';

@Injectable({
  providedIn: 'root',
})
export class WidgetDetectorService {
  private keyMap = new Map<string, WidgetType>();
  setWidgetType(attrName: string, type: WidgetType) {
    this.keyMap.set(attrName, type);
  }
  getWidgetType(attrName: string) {
    return this.keyMap.get(attrName);
  }
}
