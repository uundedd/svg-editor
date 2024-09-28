import { Component, Input } from '@angular/core';
import { Widget } from '../../../model/widget.model';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fb-color',
  standalone: true,
  imports: [CommonModule, FormsModule, ColorPickerModule],
  templateUrl: './fb-color.component.html',
  styleUrl: './fb-color.component.scss',
})
export class FbColorComponent extends Widget {
  @Input('name') name = 'none';
  @Input('label') label = '';

  valueChange(value: string) {
    this.formControl.reset(value);
  }
}
