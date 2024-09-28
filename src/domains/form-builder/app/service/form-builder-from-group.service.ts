import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable()
export class FormBuilderFormGroupService {
  rootGroup = new FormGroup({});

  setFromControl(
    name: string,
    control: AbstractControl,
    options?: {
      emitEvent?: boolean;
    },
  ) {
    this.rootGroup.addControl(name, control, options);
  }
}
