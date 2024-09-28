import { FormControl } from '@angular/forms';
import { NativeFormGroup } from './native-form-group.model';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export abstract class Widget {
  abstract name: string;
  formControl = new FormControl();
  constructor(public formGroup: NativeFormGroup) {
    this.bindInput();
  }

  value: any = null;

  bindInput() {
    this.formControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.value = value;
      });
  }

  ngOnInit() {
    this.formGroup.addControl(this.name, this.formControl);
  }
}
