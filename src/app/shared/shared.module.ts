import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MomentDatePipe } from './pipes/moment-date.pipe';


@NgModule({
  imports: [
    ClipboardModule,
    PdfViewerModule,
    MomentDatePipe
  ],
  exports: [
    MomentDatePipe,
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ClipboardModule,
    TranslateModule,
    PdfViewerModule
  ]
})
export class SharedModule { }
