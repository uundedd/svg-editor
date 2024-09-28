import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { Widget } from '../../../model/widget.model';
import { NativeFormGroup } from '../../../model/native-form-group.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-fb-file-upload',
  standalone: true,
  imports: [FileUploadModule, ButtonModule, HttpClientModule, CommonModule],
  providers: [MessageService],
  templateUrl: './fb-file-upload.component.html',
  styleUrl: './fb-file-upload.component.scss',
})
export class FbFileUploadComponent extends Widget {
  @Input('name') name = 'none';
  @Input('accept') accept = 'image/*';

  totalSize = 0;

  totalSizePercent = 0;

  constructor(
    private config: PrimeNGConfig,
    formGroup: NativeFormGroup,
  ) {
    super(formGroup);
  }

  upload(event: any) {
    this.formControl.reset(event.files);
  }
}
