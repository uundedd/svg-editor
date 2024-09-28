import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  pairwise,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import * as d3 from 'd3';

export class SelectorService {
  private liveElementHovered = new BehaviorSubject<Element | null>(null);
  private elementHovered = this.liveElementHovered.pipe(
    debounceTime(100),
    distinctUntilChanged(),
    pairwise(),
  );
  private elementClicked = new Subject<Element>();
  private takeUnitl = new Subject<boolean>();

  private element = new BehaviorSubject<Element | undefined>(undefined);
  static orginalKey = Symbol('orginal-key');

  hoverActive = new BehaviorSubject(false);

  constructor(private config: Record<string, string>) {
    this.deletectElementChange();
  }

  private deletectElementChange() {
    let subscriben: Subscription;
    combineLatest([this.element.pipe(pairwise())])
      .pipe(takeUntil(this.takeUnitl))
      .subscribe(([[oldBaseElem, newBaseElem]]) => {
        this.removeListener(oldBaseElem);
        this.addListener(newBaseElem);

        if (subscriben) {
          subscriben.unsubscribe();
        }
        subscriben = combineLatest([
          this.elementHovered,
          this.hoverActive.pipe(),
        ])
          .pipe(takeUntil(this.takeUnitl))
          .subscribe(([[oldElem, newElem], isActive]) => {
            if (oldElem) {
              this.removeHoverAttr(oldElem);
            }
            if (newElem && isActive) {
              this.setHoverAttr(newElem);
            }
          });
      });
  }

  private moveHandler(event: MouseEvent) {
    const fromElement = document.elementFromPoint(event.clientX, event.clientY);
    if (fromElement) {
      this.liveElementHovered.next(fromElement);
    }
  }

  private clickHandler(event: MouseEvent) {
    const fromElement = document.elementFromPoint(event.clientX, event.clientY);
    if (fromElement) {
      this.elementClicked.next(fromElement);
    }
  }

  private leaveHandler(event: MouseEvent) {
    this.liveElementHovered.next(null);
  }

  private setHoverAttr(current: Element) {
    const newHoverd = d3.select(current);
    const orginals: Record<string, string> = {};
    for (const key of Object.keys(this.config)) {
      orginals[key] = newHoverd.attr(key);
    }
    (current as any)[SelectorService.orginalKey] = orginals;
    for (const [key, value] of Object.entries(this.config)) {
      newHoverd.attr(key, value);
    }
  }

  private removeHoverAttr(previous: Element) {
    const previousOrginal = (previous as any)[SelectorService.orginalKey];
    if (previousOrginal) {
      const oldHovered = d3.select(previous);
      for (const key of Object.keys(this.config)) {
        oldHovered.attr(key, previousOrginal[key]);
      }
    }
  }

  private addListener(element: Element | undefined) {
    if (element) {
      d3.select(element).on('mousemove', this.moveHandler.bind(this));
      d3.select(element).on('mouseleave', this.leaveHandler.bind(this));
      d3.select(element).on('click', this.clickHandler.bind(this));
    }
  }

  private removeListener(element: Element | undefined) {
    if (element) {
      d3.select(element).on('mousemove', null);
      d3.select(element).on('mouseleave', null);
      d3.select(element).on('click', null);
    }
  }

  inital(element: Element) {
    this.element.next(element);
  }

  async activelistening() {
    this.hoverActive.next(true);
  }

  async destroy() {
    const element = this.element.getValue();
    if (element) {
      this.removeListener(element);
    }

    if (this.takeUnitl) {
      this.takeUnitl.next(true);
      this.takeUnitl.complete();
    }
  }

  getSelectedElement() {
    this.activelistening();
    return this.elementClicked;
  }

  getHoverElement() {
    this.activelistening();
    return this.elementHovered.pipe(
      map(([previous, current]) => {
        return current;
      }),
    );
  }
}
