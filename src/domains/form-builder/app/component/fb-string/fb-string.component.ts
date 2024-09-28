import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Widget } from '../../../model/widget.model';

@Component({
  selector: 'app-fb-string',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule],
  templateUrl: './fb-string.component.html',
  styleUrl: './fb-string.component.scss',
})
export class FbStringComponent extends Widget {
  @Input('name') name = 'none';
  @Input('label') label = '';
  valueChange(value: string) {
    this.formControl.reset(value);
  }
}
