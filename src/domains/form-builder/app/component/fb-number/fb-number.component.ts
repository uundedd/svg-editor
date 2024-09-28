import { Component, Input } from '@angular/core';
import { Widget } from '../../../model/widget.model';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fb-number',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule],
  templateUrl: './fb-number.component.html',
  styleUrl: './fb-number.component.scss',
})
export class FbNumberComponent extends Widget {
  @Input('name') name = 'none';
  @Input('label') label = '';
  @Input('min') min = -1000000000;
  @Input('max') max = 1000000000;

  valueChange(value: string) {
    this.formControl.reset(value);
  }
}
