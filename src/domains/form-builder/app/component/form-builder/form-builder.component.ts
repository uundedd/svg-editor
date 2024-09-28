import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderFormGroupService } from '../../service/form-builder-from-group.service';
import { NgIf } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';
import { distinctUntilChanged } from 'rxjs';
import { NativeFormGroup } from '../../../model/native-form-group.model';

@UntilDestroy()
@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, ButtonModule],
  providers: [
    FormBuilderFormGroupService,
    {
      provide: NativeFormGroup,
      useFactory: (formGroupService: FormBuilderFormGroupService) => {
        return formGroupService.rootGroup;
      },
      deps: [FormBuilderFormGroupService],
    },
  ],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
})
export class FormBuilderComponent implements OnChanges {
  @Input('label') label: string | undefined = undefined;
  @Input('buttonLabel') buttonLabel = 'Accept';
  @Output('submit') submit = new EventEmitter();
  @Input('model') model: any | undefined;
  @Output('modelChange') change = new EventEmitter();

  constructor(public formGroupService: FormBuilderFormGroupService) {
    this.formGroupService.rootGroup.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((value) => {
        this.change.emit(value);
      });
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.formGroupService.rootGroup.reset(this.model);
    }, 0);
  }

  onSubmit() {
    this.submit.emit(this.formGroupService.rootGroup.value);
  }
}
